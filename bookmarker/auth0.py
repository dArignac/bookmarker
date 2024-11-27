import jwt
import requests
from django.conf import settings
from jwt.exceptions import InvalidTokenError
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed


# FIXME should cache that?
def get_auth0_public_key(token):
    jwks_url = f"https://{settings.AUTH0_DOMAIN}/.well-known/jwks.json"
    response = requests.get(jwks_url)
    jwks = response.json()

    # Extract `kid` from token header
    unverified_header = jwt.get_unverified_header(token)
    kid = unverified_header["kid"]

    # Find the key with the matching `kid`
    for key in jwks["keys"]:
        if key["kid"] == kid:
            return jwt.algorithms.RSAAlgorithm.from_jwk(key)

    raise Exception("Public key not found.")


class Auth0JSONWebTokenAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return None

        token = auth_header.split(" ")[1]

        public_key = get_auth0_public_key(token)

        try:
            # Decode the JWT using Auth0's public key
            payload = jwt.decode(
                token,
                # settings.AUTH0_PUBLIC_KEY,
                public_key,
                algorithms=["RS256"],
                audience=settings.AUTH0_AUDIENCE,
                issuer=f"https://{settings.AUTH0_DOMAIN}/",
            )
        except InvalidTokenError as e:
            raise AuthenticationFailed(f"Invalid token: {str(e)}")

        # Optionally, map payload to a user instance
        user = self.get_or_create_user(payload)
        return (user, token)

    def get_or_create_user(self, payload):
        from django.contrib.auth.models import User

        user_id = payload.get("sub")
        user, created = User.objects.get_or_create(username=user_id)
        return user

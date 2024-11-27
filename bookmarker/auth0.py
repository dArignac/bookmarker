import jwt
from jwt.exceptions import InvalidTokenError
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.conf import settings


class Auth0JSONWebTokenAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return None

        token = auth_header.split(" ")[1]

        try:
            # Decode the JWT using Auth0's public key
            payload = jwt.decode(
                token,
                settings.AUTH0_PUBLIC_KEY,
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

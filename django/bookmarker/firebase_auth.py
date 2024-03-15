import firebase_admin
from firebase_admin import auth, credentials
from rest_framework.authentication import BaseAuthentication

# init firebase project
cred = credentials.Certificate("firebase-serviceaccount.json")
firebase_admin.initialize_app(cred)


def get_token_auth_header(request):
    """Obtains the Access Token from the Authorization Header"""
    auth = request.META.get("HTTP_AUTHORIZATION", None)
    parts = auth.split()
    token = parts[1]

    return token


class FirebaseJWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return None
        token = auth_header.split(" ")[1]
        payload = auth.verify_id_token(token)

        user = self.get_or_create_user(payload)
        return (user, token)

    def get_or_create_user(self, payload):
        from django.contrib.auth.models import User

        user, _ = User.objects.get_or_create(
            username=payload.get("sub"),
            last_name=payload.get("name"),
            email=payload.get("email"),
        )
        return user

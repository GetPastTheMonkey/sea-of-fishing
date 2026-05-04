from django.conf import settings
from django.http import HttpRequest
from rest_framework import authentication, exceptions

from user.models import User


class CookieAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request: HttpRequest):
        token = request.COOKIES.get(settings.AUTH_COOKIE_NAME, None)

        if token is None:
            return None

        try:
            user = User.objects.get(auth_token=token)
        except User.DoesNotExist:
            raise exceptions.AuthenticationFailed("No user with this token")

        return user, user.auth_token

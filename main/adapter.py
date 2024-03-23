from allauth.account.adapter import DefaultAccountAdapter
from django.forms import ValidationError


class AccountAdapter(DefaultAccountAdapter):
    # disables registration, see https://github.com/pennersr/django-allauth/issues/345
    def is_open_for_signup(self, request):
        return False

    # disables the regular login (no effect on templates)
    def pre_authenticate(self, request, **credentials):
        raise ValidationError("Regular login is disabled")

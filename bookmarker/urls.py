from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    # FIXME exclude on prod
    path("__debug__/", include("debug_toolbar.urls")),
    path("admin/", admin.site.urls),
    # FIXME should only hook up urls that we need
    path("accounts/", include("allauth.urls")),
    path("", include("main.urls")),
]

from django.urls import include, path

from rest.exceptions import error_handler

handler400 = error_handler
handler403 = error_handler
handler404 = error_handler
handler500 = error_handler

urlpatterns = [
    path("", include("rest.urls")),
]

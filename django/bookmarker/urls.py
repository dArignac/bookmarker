from django.urls import include, path

# FIXME does not work
handler400 = "rest.exceptions.error_handler"
handler403 = "rest.exceptions.error_handler"
handler404 = "rest.exceptions.error_handler"
handler500 = "rest.exceptions.error_handler"

urlpatterns = [
    path("", include("rest.urls")),
]

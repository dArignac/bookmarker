from rest_framework import routers

from django.urls import include, path

from . import views

router = routers.DefaultRouter()
router.register(r"bookmarks", views.BookmarkViewSet)
router.register(r"tags", views.TagViewSet)

urlpatterns = [
    path("", include(router.urls)),
    # FIXME remove
    path("public", views.public),
    path("private", views.private),
]

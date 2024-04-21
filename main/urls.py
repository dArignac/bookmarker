from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="main_index"),
    path("bookmarks", views.bookmarks, name="bookmarks"),
    path(
        "bookmarks/delete/<id>",
        views.bookmark_delete,
        name="bookmark_delete",
    ),
]

from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="main_index"),
    path("bookmarks", views.bookmarks_list, name="bookmarks"),
    path(
        "bookmarks/delete/<bookmark_id>",
        views.bookmark_delete,
        name="bookmark_delete",
    ),
    path("tags", views.tags_list, name="tags"),
    path(
        "tags/delete/<tag_id>",
        views.tag_delete,
        name="tag_delete",
    ),
]

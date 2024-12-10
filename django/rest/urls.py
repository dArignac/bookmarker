from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from rest.views.bookmarks import BookmarkDetails, BookmarkList
from rest.views.tags import TagDetails, TagList

urlpatterns = format_suffix_patterns(
    [
        path("bookmarks", BookmarkList.as_view()),
        path("bookmarks/<str:pk>", BookmarkDetails.as_view()),
        path("tags", TagList.as_view()),
        path("tags/<str:pk>", TagDetails.as_view()),
    ]
)

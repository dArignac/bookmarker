from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="main_index"),
    path("bookmarks", views.bookmarks, name="bookmarks"),
]

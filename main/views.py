from django.contrib.auth.decorators import login_required
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.csrf import requires_csrf_token

from .forms import TagCreateForm, BookmarkCreateForm
from .models import Bookmark, Tag


def index(request):
    context = {}
    return render(request, "index.html", context)


@login_required
@requires_csrf_token
def bookmarks_list(request):
    bookmarks = Bookmark.objects.all()

    if request.method == "POST":
        form = BookmarkCreateForm(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect(reverse("bookmarks"))

    return render(request, "bookmarks.html", {"bookmarks": bookmarks, "form": None})


@login_required
@requires_csrf_token
def bookmark_delete(request, bookmark_id):
    try:
        bookmark = Bookmark.objects.get(id=bookmark_id)
    except ObjectDoesNotExist:
        bookmark = None

    if request.method == "POST" and bookmark is not None:
        bookmark.delete()
        return HttpResponseRedirect(reverse("bookmarks"))

    return render(request, "bookmark_delete.html", {"bookmark": bookmark})


@login_required
@requires_csrf_token
def tags_list(request):
    tags = Tag.objects.all()

    if request.method == "POST":
        form = TagCreateForm(request.POST)
        if form.is_valid():
            form.save()
            # return HttpResponseRedirect(reverse("tags"))

    return render(request, "tags.html", {"tags": tags})


@login_required
@requires_csrf_token
def tag_delete(request, tag_id):
    try:
        tag = Tag.objects.get(id=tag_id)
    except ObjectDoesNotExist:
        tag = None

    if request.method == "POST" and tag is not None:
        tag.delete()
        return HttpResponseRedirect(reverse("tags"))

    return render(request, "tag_delete.html", {"tag": tag})

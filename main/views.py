from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.core.exceptions import ObjectDoesNotExist

from .forms import BookmarkCreateForm
from .models import Bookmark


def index(request):
    context = {}
    return render(request, "index.html", context)


@login_required
def bookmarks(request):
    bookmarks = Bookmark.objects.all()[:10]

    if request.method == "POST":
        form = BookmarkCreateForm(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect(reverse("bookmarks"))

    return render(request, "bookmarks.html", {"bookmarks": bookmarks, "form": None})


@login_required
def bookmark_delete(request, id):
    try:
        bookmark = Bookmark.objects.get(id=id)
    except ObjectDoesNotExist:
        bookmark = None

    if request.method == "POST" and bookmark is not None:
        bookmark.delete()
        return HttpResponseRedirect(reverse("bookmarks"))

    return render(request, "bookmark_delete.html", {"bookmark": bookmark})

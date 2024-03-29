from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse

from .forms import BookmarkCreateForm
from .models import Bookmark


def index(request):
    context = {}
    return render(request, "index.html", context)


@login_required
def bookmarks(request):
    bookmarks = Bookmark.objects.all()[:10]

    # FIXME move to templatetag
    if request.method == "POST":
        form = BookmarkCreateForm(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect(reverse("bookmarks"))
    else:
        form = BookmarkCreateForm()

    return render(request, "bookmarks.html", {"bookmarks": bookmarks, "form": form})

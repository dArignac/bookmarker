from django.contrib.auth.decorators import login_required
from django.shortcuts import render


# Create your views here.
def index(request):
    context = {}
    return render(request, "index.html", context)


# FIXME implement
@login_required
def bookmarks(request):
    return render(request, "bookmarks.html")

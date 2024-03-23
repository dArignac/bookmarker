from django.shortcuts import render


# Create your views here.
def index(request):
    context = {}
    return render(request, "index.html", context)


# FIXME implement
def bookmarks_list(request):
    return render(request, "bookmarks_list.html")

from rest_framework import permissions, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

from django.http import JsonResponse

from rest.serializers import BookmarkSerializer, TagSerializer
from rest.models import Bookmark, Tag


@api_view(["GET"])
@permission_classes([AllowAny])
def public(request):
    return JsonResponse(
        {
            "message": "Hello from a public endpoint! You don't need to be authenticated to see this."
        }
    )


@api_view(["GET"])
def private(request):
    return JsonResponse(
        {
            "message": "Hello from a private endpoint! You need to be authenticated to see this."
        }
    )


# FIXME change to class based views


class BookmarkViewSet(viewsets.ModelViewSet):
    queryset = Bookmark.objects.all().order_by("-date_creation")
    serializer_class = BookmarkSerializer
    permission_classes = [permissions.IsAuthenticated]


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all().order_by("title")
    serializer_class = TagSerializer
    permission_classes = [permissions.IsAuthenticated]

from rest_framework import generics

from rest.models import Bookmark
from rest.serializers import BookmarkSerializer


class BookmarkList(generics.ListCreateAPIView):
    queryset = Bookmark.objects.all()
    serializer_class = BookmarkSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class BookmarkDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Bookmark.objects.all()
    serializer_class = BookmarkSerializer

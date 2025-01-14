from rest_framework import generics, permissions

from rest.models import Bookmark
from rest.serializers import BookmarkSerializer


class BookmarkList(generics.ListCreateAPIView):
    # FIXME needs to filter by user
    queryset = Bookmark.objects.all()
    serializer_class = BookmarkSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class BookmarkDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Bookmark.objects.all()
    serializer_class = BookmarkSerializer
    permission_classes = [permissions.IsAuthenticated]

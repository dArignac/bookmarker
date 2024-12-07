from rest_framework import serializers

from rest.models import Bookmark, Tag


class BookmarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookmark
        fields = ["title", "url", "date_creation", "tags"]


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["title"]

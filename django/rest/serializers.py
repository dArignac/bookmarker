from rest_framework import serializers

from rest.models import Bookmark, Tag


class BookmarkSerializer(serializers.ModelSerializer):
    tags = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Bookmark
        fields = ["id", "title", "url", "date_creation", "tags"]


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["id", "title"]

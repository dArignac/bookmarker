from rest_framework import serializers

from rest.error_codes import ERROR_CODE_BOOKMARK_URL_EXISTS
from rest.exceptions import Conflict
from rest.models import Bookmark, Tag


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["id", "title"]


class BookmarkSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)
    tag_ids = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Tag.objects.all(), write_only=True
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        # Dynamically set the queryset for tag_ids based on the current user
        request = self.context.get("request")
        if request and request.user.is_authenticated:
            self.fields["tag_ids"].queryset = Tag.objects.filter(user=request.user)

    def create(self, validated_data):
        tag_ids = validated_data.pop("tag_ids", [])

        existing_bookmarks = Bookmark.objects.filter(
            url=validated_data["url"], user=validated_data["user"]
        ).count()
        if existing_bookmarks > 0:
            raise Conflict(
                detail="Bookmark already exists", code=ERROR_CODE_BOOKMARK_URL_EXISTS
            )

        bookmark = Bookmark.objects.create(**validated_data)
        bookmark.tags.set(tag_ids)
        return bookmark

    def update(self, instance, validated_data):
        tag_ids = validated_data.pop("tag_ids", [])
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        if tag_ids is not None:
            instance.tags.set(tag_ids)
        return instance

    class Meta:
        model = Bookmark
        fields = ["id", "title", "url", "date_creation", "tags", "tag_ids"]

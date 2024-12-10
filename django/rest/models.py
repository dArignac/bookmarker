import uuid

from django.conf import settings
from django.db import models


class Tag(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=150)

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="tags", on_delete=models.CASCADE
    )

    def __str__(self):
        return self.title


class Bookmark(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    url = models.URLField()
    date_creation = models.DateTimeField(auto_now_add=True)

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="bookmarks", on_delete=models.CASCADE
    )

    tags = models.ManyToManyField(Tag)

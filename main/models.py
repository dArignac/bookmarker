import uuid

from django.db import models


class Tag(models.Model):
    title = models.CharField(max_length=150)


class Bookmark(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    url = models.URLField()
    date_creation = models.DateTimeField(auto_now_add=True)

    tags = models.ManyToManyField(Tag)

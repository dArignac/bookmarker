from django.forms import ModelForm

from .models import Bookmark


class BookmarkCreateForm(ModelForm):
    template_name = "bookmark_form.html"

    class Meta:
        model = Bookmark
        fields = ["title", "url", "tags"]

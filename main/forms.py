from django import forms
from django.forms import ModelForm

from main.widgets import CustomSelect

from .models import Bookmark, Tag


class GenericForm(ModelForm):
    template_name = "generic_form.html"


class BookmarkCreateForm(GenericForm):
    # FIXME this is maybe an alternative
    # tags = ModelMultipleChoiceField(
    #     queryset=Tag.objects.all(), required=False, widget=CheckboxSelectMultiple
    # )

    def __init__(self, *args, **kwargs):
        super(BookmarkCreateForm, self).__init__(*args, **kwargs)
        self.fields["tags"].required = False

    class Meta:
        model = Bookmark
        fields = ["title", "url", "tags"]
        widgets = {
            "title": forms.TextInput(
                attrs={
                    "class": "s-input",
                    "placeholder": "Enter the title here",
                }
            ),
            "url": forms.TextInput(
                attrs={
                    "class": "s-input",
                    "placeholder": "Enter the URL here",
                }
            ),
            "tags": CustomSelect(),
        }


class TagCreateForm(GenericForm):
    class Meta:
        model = Tag
        fields = ["title"]

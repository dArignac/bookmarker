from django.forms import ModelForm

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


class TagCreateForm(GenericForm):
    class Meta:
        model = Tag
        fields = ["title"]

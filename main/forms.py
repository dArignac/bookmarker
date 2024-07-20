from django.forms import ModelForm

from .models import Bookmark


class BookmarkCreateForm(ModelForm):
    template_name = "bookmark_form.html"
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

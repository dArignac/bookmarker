from django import template
from django.template.loader import render_to_string

from ..forms import BookmarkCreateForm

register = template.Library()


@register.simple_tag(takes_context=True)
def bookmark_add_form(context):
    if context["request"].method == "POST":
        form = BookmarkCreateForm(context["request"].POST)
    else:
        form = BookmarkCreateForm()

    return render_to_string(
        "bookmark_form_wrapper.html", {"form": form}, request=context["request"]
    )

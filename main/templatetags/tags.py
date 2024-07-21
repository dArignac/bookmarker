from django import template
from django.template.loader import render_to_string

from ..forms import TagCreateForm

register = template.Library()


@register.simple_tag(takes_context=True)
def tag_add_form(context):
    if context["request"].method == "POST":
        form = TagCreateForm(context["request"].POST)
    else:
        form = TagCreateForm()

    return render_to_string(
        "generic_form_wrapper.html",
        {"form": form, "url_name": "tags"},
        request=context["request"],
    )

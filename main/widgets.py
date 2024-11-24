from django.forms.widgets import Select


class CustomSelect(Select):
    template_name = "widgets/select.html"

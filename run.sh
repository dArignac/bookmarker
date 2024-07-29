#!/bin/sh
python manage.py migrate
daphne bookmarker.asgi:application
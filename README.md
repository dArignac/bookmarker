# bookmarker

Naive bookmarking application bringing structure into the bookmarks chaos.

## Development

Install with `pipenv install` (requires [pipenv](https://pipenv.pypa.io/en/latest/)).

Copy `docker-compose.example.yml` to `docker-compose.override.yml` and adjust the values to your requirements.

Start the database and adminer: `docker-compose up -d`.

Reach adminer at http://127.0.0.1:8080.

Activate pipenv shell with `pipenv shell`.

Apply database migrations with `python manage.py migrate`.

FIXME: do we need admin at all?
Create a superuser with `python manage.py createsuperuser`.

Create a Google app following https://docs.allauth.org/en/latest/socialaccount/providers/google.html, but do not create the entry in the admin site, as be fill the values from the settings.

Copy `.env.dist` to `.env` and fill the marked settings.

Start Django with `python manage.py runserver` and reach the frontend at http://localhost:8000/.


### Templates allauth

Are at `/.local/share/virtualenvs/bookmarker-59kjtkyq/lib/python3.10/site-packages/allauth/templates`

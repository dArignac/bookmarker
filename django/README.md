# bookmarker

Naive bookmarking application bringing structure into the bookmarks chaos.

Uses Firebase Authentication for user login and JWT tokens.

## Development

Create a virtualenv with `python -m venv .venv` and activate with `. .venv/bin/activate`.

Install packages `poetry install`.

Copy `.env.dist` to `.env` and fill the marked settings.

Copy `docker-compose.example.yml` to `docker-compose.override.yml` and adjust the values to your requirements.

```
services:

  db:
    environment:
      POSTGRES_PASSWORD: bookmarker
      POSTGRES_USER: bookmarker
      POSTGRES_DB: bookmarker
```

Start the database and adminer: `docker-compose up -d db && docker-compose up -d adminer`.

Reach adminer at http://127.0.0.1:8080.

Apply database migrations with `python manage.py migrate`.

Start Django with `poetry run python manage.py runserver`

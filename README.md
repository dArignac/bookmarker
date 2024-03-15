# bookmarker

Naive bookmarking application bringing structure into the bookmarks chaos.

## Development

Install with `pipenv install` (requires [pipenv](https://pipenv.pypa.io/en/latest/)).

Copy `docker-compose.example.yml` to `docker-compose.override.yml` and adjust the values to your requirements.

Start the database and adminer: `docker-compose up -d`.

Reach adminer at http://127.0.0.1:8080.

Activate pipenv shell with `pipenv shell`.

Apply database migrations with `python manage.py migrate`.

Start Django with `python manage.py runserver` and reach the frontend at http://localhost:8000/.

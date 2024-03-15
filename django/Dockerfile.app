FROM python:3.10-alpine AS builder

RUN apk update && \
    apk add --no-cache musl-dev libpq-dev gcc postgresql-dev python3-dev build-base

RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

ADD requirements.txt .
RUN pip install -r requirements.txt






FROM python:3.10-alpine
RUN apk update \
    && apk add --no-cache libpq-dev

COPY --from=builder /opt/venv /opt/venv

ENV PATH="/opt/venv/bin:$PATH"
ENV PYTHONUNBUFFERED=1

WORKDIR /srv

ADD .env-docker .env
ADD run.sh .
ADD manage.py .
ADD bookmarker ./bookmarker
ADD main ./main

EXPOSE 8000

ENTRYPOINT [ "sh", "-c", "/srv/run.sh" ]
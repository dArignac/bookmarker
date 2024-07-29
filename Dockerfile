FROM python:3.10-alpine AS builder

RUN apk update && \
    apk add --no-cache musl-dev libpq-dev gcc

RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

RUN pip install daphne

ADD requirements.txt .
RUN pip install -r requirements.txt






FROM python:3.10-alpine
RUN apk update && \
    apk add --no-cache libpq-dev

COPY --from=builder /opt/venv /opt/venv

ENV PATH="/opt/venv/bin:$PATH"
ENV PYTHONUNBUFFERED=1

WORKDIR /srv

ADD run.sh .
ADD manage.py .
ADD bookmarker ./bookmarker
ADD main ./main

EXPOSE 8000

ENTRYPOINT [ "sh", "-c", "/srv/run.sh" ]
FROM python:3

RUN mkdir /kiosk
COPY ./backend /kiosk

WORKDIR /kiosk
RUN pip install -r requirements.txt

ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
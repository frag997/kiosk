FROM node:latest

WORKDIR /kiosk
COPY ./frontend/package.json ./
COPY ./frontend/package-lock.json ./

RUN npm install

ENV PATH /kiosk/node_modules/.bin:$PATH

WORKDIR /kiosk/app

COPY ./frontend .
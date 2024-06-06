# build client
FROM node:18 AS build

WORKDIR /client

COPY package*.json /client

RUN npm install

COPY . /client

RUN npm run build

RUN npm install -g serve
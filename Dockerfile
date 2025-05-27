ARG NODE_VERSION=24

FROM node:${NODE_VERSION}-alpine AS ghosttachi_node

WORKDIR /home/docker

RUN apk add git

COPY package*.json ./

RUN npm install --force

RUN npx prisma generate


FROM postgres:13.1 AS ghosttachi_postgres

RUN mkdir -p /docker-entrypoint-initdb.d

COPY ./docker/db/add-unaccent-extensions.sh /docker-entrypoint-initdb.d/add-unaccent-extensions.sh

RUN chmod +x /docker-entrypoint-initdb.d/add-unaccent-extensions.sh

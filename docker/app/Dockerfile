FROM node:alpine as base

ARG TUSK_VERSION=v0.5.1

ENV PROJECT_DIR=/app

WORKDIR /app
RUN apk --update --no-cache \
      add curl \
    && curl -sL https://git.io/tusk | sh -s -- -b /usr/local/bin $TUSK_VERSION


#
#
#
FROM base as install

COPY ./package.json \
     ./package-lock.json \
     ./

RUN npm install

COPY ./docker/app/entrypoint.sh /entrypoint.sh
COPY ./docker/app/entrypoint.d/* /entrypoint.d/
RUN chmod +x /entrypoint.sh
RUN chmod +x /entrypoint.d/*

COPY ./docker/app/tools/* /tools/
RUN chmod +x /tools/*


#
#
#
FROM install as prod

COPY ./src \
     ./

# ENTRYPOINT [ "/entrypoint.sh" ]
RUN ["npm", "run", "prod"]

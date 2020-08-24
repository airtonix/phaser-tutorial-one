FROM node:alpine as base

ARG TUSK_VERSION=v0.5.1

ENV PROJECT_DIR=/app

# 1. Solves `lscpu not found error with parcel`
#    https://github.com/parcel-bundler/parcel/issues/2555#issuecomment-457162656
WORKDIR /app
RUN apk --update --no-cache add \
     curl \
     # 1. \/
     util-linux \
    && curl -sL https://git.io/tusk | sh -s -- -b /usr/local/bin $TUSK_VERSION

ENV ENTRYPOINT_TASKS_DIR=/entrypoint.d/

COPY ./entrypoint.sh /entrypoint.sh
COPY ./entrypoint.d/* /entrypoint.d/
RUN chmod +x /entrypoint.sh
RUN chmod +x /entrypoint.d/*

ENTRYPOINT [ "/entrypoint.sh" ]

#
#
#
FROM base as install

WORKDIR /build

COPY ./package.json \
     ./yarn.lock \
     ./

RUN yarn install

#
#
#
FROM base as prod

COPY --from=install /build/node_modules /app/node_modules

COPY ./tusk.yml \
     ./.browserslistrc \
     ./.eslintrc.js \
     ./cssnano.config.js \
     ./jest.config.js \
     ./postcss.config.js \
     ./tsconfig.json \
     ./src \
     ./tools \
     ./

CMD ["tusk", "build"]

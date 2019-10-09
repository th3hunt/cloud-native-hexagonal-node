# hexagonal-cloud-native-node :rocket:

> A cloud native node microservice boilerplate based on the hexagonal architecture

**This is work in progress**

## About

This WIP boilerplate aims to be a solid example of how a modern, cloud-native Node.js
based microservice could look like based on the [hexagonal architecture](https://softwarecampament.wordpress.com/portsadapters/) -
an architecture focused around [Use Cases](https://en.wikipedia.org/wiki/Use_case).

## TODO

- Polish domain logic
- Add MongoDB driven adapter
- Add PostgresDB driven adapter
- Add Kafka driver adapter
- Add GRPC driver
- Add tests
- Add tracing with opentracing + Jaeger

## Getting started

You'll need to have:

- git: ^2.11
- node: ^10
- npm: ^6.5
- yarn: ^1.15
- Docker

Then perform the following steps

```sh
$ cp .env.sample .env
$ cp docker-compose.env.sample docker-compose.env
```

## Development

```sh
# start in development mode using nodemon
yarn dev

# run tests
yarn test

# start in debug mode
yarn debug

# run linters (eslint + prettier)
yarn lint

# drive through cli
yarn cmd

# create production build
yarn build

# start production build
yarn start
```

## Docs

```sh
# Generate JS docs
$ yarn jsdoc

# Generate API docs
$ yarn apidoc
```

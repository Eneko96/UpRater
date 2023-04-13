# Uprater

## Description

Uprater is a Social Media Platform that allows users to rate and review other users, as well as comment on those reviews. Users can also follow other users, and see how are they being rated in their feed. Having as well a dashboard with metrics about their own ratings how are they being rated under several categories.

Uprater is a project between some friends, and is being developed as a way to learn and practice new technologies.

## Installation

The project is being developed using NestJS, a NodeJS framework, and MongoDB as the database. The project is also using Docker to run the database, and RabbitMQ as the message broker, so it is not necessary to install those dependencies.

In case you want to run the project without Docker, you will need to install MongoDB and RabbitMQ.

```bash
# install dependencies without docker
$ cd main_server

$ yarn install

$ cd ..

$ cd node_rabbit

$ yarn install
```

## Running the app (for each service)

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test (for each service)

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Docker Instance

```bash

# automatically start docker compose (weather windows or mac)
# configure rabbit dashboard
# open 4 terminals
# show docker containers running
$ chmod +x run.dev.sh
$ ./run.dev.sh

# build compose for production (mongo)
$ docker-compose build && ./dbstart-prod.sh

# docker compose for development (mongo)
$ docker-compose -f docker-compose.mdb.dev.yml build && ./dbstart.sh
```

## Enabling RabbitMQ Dashboard (port 15672)

```bash
docker exec -it rabbit rabbitmq-plugins enable rabbitmq_management
```

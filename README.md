# Uprater

## Description

Uprater is a Social Media Platform that allows users to rate and review other users, as well as comment on those reviews. Users can also follow other users, and see how are they being rated in their feed. Having as well a dashboard with metrics about their own ratings how are they being rated under several categories.

Uprater is a project between some friends, and is being developed as a way to learn and practice new technologies.

### Before going hands on

- On root level, npm i, it will give a tool for making conventional commits via husky, its a workaround, npm will be deleted in a furhter release
- Remember that the branches have to follow the [conventional commits](https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13), if there is any missing, the dict that contains and manage them is located in **.husky/commit-msg**

## Running the app for Kubernetes

First enable the kubernetes in docker (settings, kuberentes icon, enable and reset)

To stop the kubernetes in docker environment, go on settings and click on reset kubernetes cluster

```bash
# starting up the kubernetes cluster
$ cd deploy
$ chmod -x run-deploy.sh
$ ./run-deploy-sh
```

For a friendlier ui, you can install Lens, which is a interface for clusters like kubernetes, once the kubernetes cluster
is running, lens will automatically append it on the interface

### To migrate data for the mongo replset

```bash
# migrate
$ cd jobs
# config.map is a one time addition, it appends the jsons to the cluster config map
$ kubectl apply -f config-map.yml
$ kubectl apply -f migrate.yml
```

## Docker-compose instance

```bash

# automatically start docker compose (weather windows or mac)
# configure rabbit dashboard
# open 4 terminals
# show docker containers running
$ chmod +x run.dev.sh
# arguments --migrate and/or --panes can be added on the script
$ ./run.dev.sh
# example with args
$ ./run.dev.sh --migrate

```

## Creating a rabbit password for the instance (!!DEPRECATED)

```python

python3 -c 'import hashlib;print(hashlib.sha256("mypassword".encode("utf-8")).hexdigest())'

```

## Manual installation

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

In case you don't want kubernetes or docker-compose to manage the servers, you can run it on local by your own by:

You'd need a mongo instance on local as well as a rabbitmq instance

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

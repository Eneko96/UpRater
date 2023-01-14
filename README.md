## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Docker Postgres

```bash
# build and run container (env variables not working, that's why they are here, still need to figure that out)
$ docker run --name postgres -p 5432:5432 -e POSTGRES_DB=uprater -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -d postgres
```

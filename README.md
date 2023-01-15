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

## Docker Instance Postgres
  
  ```bash
  # build compose for production (mongo)
  $ docker-compose build && ./dbstart-prod.sh

  # docker compose for development (mongo)
  $ docker-compose -f docker-compose.mdb.dev.yml build && ./dbstart.sh
  ```
  
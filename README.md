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
  # build image
  $ docker build . -t local-postgres

  # run container 
  $ docker run --name postgres -p 5432:5432 -d postgres
  ```

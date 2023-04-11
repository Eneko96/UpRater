FROM node:16-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock ./usr/src/app

RUN yarn install --silent

COPY . /usr/src/app

EXPOSE 3000

CMD ["yarn", "start:dev"]

FROM node:16-alpine

WORKDIR /usr/src/rabbit-broker

COPY package.json yarn.lock ./
COPY . .
RUN yarn install --silent

EXPOSE 4000

CMD ["yarn", "start:dev"]
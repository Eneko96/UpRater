FROM node:16-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
COPY . .
RUN yarn install --silent

EXPOSE 3000

CMD ["yarn", "start:dev"]
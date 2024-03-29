FROM node:16-alpine

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn install --silent

COPY . .

EXPOSE 3000

CMD ["yarn", "start:test"]
# CMD ["yarn", "start:test"]
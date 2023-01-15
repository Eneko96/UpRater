FROM node:16-alpine
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --silent
COPY . .
run yarn build
EXPOSE 3000
CMD ["node", "dist/main.js"]

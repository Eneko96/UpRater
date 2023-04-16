# build environment
FROM node:18-alpine as build
WORKDIR /app
COPY . .
RUN yarn install --silent

EXPOSE 5173
CMD ["yarn", "dev"]
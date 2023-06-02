###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:20-alpine As development
WORKDIR /app
EXPOSE 3000
CMD npm run migration:run && npm run start:dev

###################
# BUILD FOR PRODUCTION
###################

FROM node:20-alpine as production
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD npx typeorm migration:generate -d dist/data/database.config.js && npm run migration:run && npm run start:prod


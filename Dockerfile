# stage 1 building the code
FROM node:14-alpine as builder
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# stage 2
FROM node:14-alpine
WORKDIR /usr/app
COPY package*.json ./
RUN npm install --production

COPY --from=builder /usr/app/dist ./dist

COPY ormconfig.docker.js ./ormconfig.js
COPY .env .
ENV NODE_PATH=./dist/.

EXPOSE 3000
RUN cat ./ormconfig.js
CMD node dist/index.js
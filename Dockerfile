FROM node:14-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
# RUN npm install --production --silent && npm install typescript -g && mv node_modules ../
RUN yarn install --frozen-lockfile --silent
COPY . .
# COPY ./dist/. .
ENV PORT=3000
ENV NODE_PATH=./dist/.
ENV DB_NAME=dejamobile
ENV DB_USER=postgres
ENV DB_PASS=postgres
ENV JWT_SECRET=xxxxsecretxxxx
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
RUN ls
CMD ["node", "dist/index.js"]

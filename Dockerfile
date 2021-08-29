FROM node:13.12-alpine

WORKDIR /

COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production=false --silent
COPY . .

RUN npm run build

CMD node ./dist/index.js

EXPOSE 8000

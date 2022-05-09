FROM node:13.12-alpine AS builder
WORKDIR /
COPY package*.json ./
RUN npm install --silent
COPY . .
RUN npm run build

FROM node:13.12-alpine 
WORKDIR /
COPY --from=builder /dist ./dist
COPY package*.json ./
# COPY --from=builder ./.env.dev ./dist/.env
RUN npm install --production --silent
WORKDIR /dist
EXPOSE 8000
CMD node index.js




FROM node:20 AS build-env

WORKDIR /app

COPY package*.json ./
COPY ./src ./src

RUN npm ci --omit=dev


FROM gcr.io/distroless/nodejs20-debian12

COPY --from=build-env /app /app
WORKDIR /app

CMD ["src/index.js"]
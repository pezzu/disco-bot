FROM node:20 AS build-env

WORKDIR /app

RUN mkdir -p /app/bin && \
    wget -O /app/bin/yt-dlp https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp_linux && \
    chmod +x /app/bin/yt-dlp

COPY package*.json ./
RUN npm ci --omit=dev

COPY ./src ./src

FROM gcr.io/distroless/nodejs20-debian12

COPY --from=build-env /app /app
WORKDIR /app

CMD ["src/index.js"]
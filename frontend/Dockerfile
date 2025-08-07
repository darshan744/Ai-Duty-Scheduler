# Build the application using minnimalistic image of nodejs
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build


FROM nginx

WORKDIR /app

COPY --from=builder ./app/dist/ /usr/share/nginx/html/

COPY nginx.conf  /etc/nginx/conf.d/duty.conf

EXPOSE 80

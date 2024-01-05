FROM node:lts-alpine as builder

RUN mkdir -p /app
WORKDIR /app
COPY package.json .
COPY package*.json ./
RUN npm install --force
COPY . . 
COPY .env .
RUN npm run build

FROM nginx:1.25.3-alpine as runner
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
#COPY default.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]





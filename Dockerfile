# FROM node:18.0.0-alpine3.15
FROM node:18-alpine

WORKDIR /app

COPY . .

# RUN apk update

RUN npm install pm2 -g && npm install

# RUN npm run build 
RUN npm run build && \
    npm prune --production --silent

EXPOSE 3000

CMD ["pm2-runtime", "pm2.config.cjs"]
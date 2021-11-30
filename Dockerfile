FROM node:10-alpine

RUN apk add --no-cache python make gcc g++ git && \
    npm config set unsafe-perm true

WORKDIR /app

ADD package.json package-lock.json /app/

RUN npm install && \
    npm install

ADD . /app
RUN npm run build && \
    mv /app/config.server.json /app/config.json && \
    mv /app/config.ui.json  /app/public/config.json

EXPOSE 5001

CMD ["node","index.js"]

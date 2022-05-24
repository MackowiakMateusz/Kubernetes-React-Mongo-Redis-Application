FROM node:alpine

WORKDIR /opt/app

COPY ./package.json ./

RUN npm install
RUN npm install -g nodemon
COPY ./ ./

CMD node index.js
EXPOSE 5432
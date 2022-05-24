FROM node:alpine

WORKDIR /opt/app

COPY ./package.json ./

RUN yarn install
RUN npm install -g nodemon
COPY . .

CMD ["yarn", "start"]
EXPOSE 4987
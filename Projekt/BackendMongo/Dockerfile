FROM node:14.5.0-alpine
WORKDIR './opt/AppMongo'
COPY ./package.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["node", "index.js"]

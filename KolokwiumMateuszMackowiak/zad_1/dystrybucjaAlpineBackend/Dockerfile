FROM node:alpine
WORKDIR './opt/express_server'
COPY ./package.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "start"]
EXPOSE 5000
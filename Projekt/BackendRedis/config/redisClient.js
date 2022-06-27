const Redis = require("ioredis");

const dbConnData = {
  port: process.env.REDIS_PORT || 6379,
  host: process.env.REDIS_HOST || '10.1.1.29',
};
const client = new Redis(dbConnData);

module.exports = client;
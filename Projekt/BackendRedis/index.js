const express = require('express');
const app = express();
const Comments = require('./routes/comments');
require('dotenv').config();

const cors = require('cors')
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}
app.use(cors(corsOptions));
app.use(express.json());
app.use('/comments', Comments);

// Łączymy się z bazą i „stawiamy” serwer API
// Do kontaktu z serwerem Redis wykorzystamy bibliotekę IORedis
const client = require('./config/redisClient');

client.on('error', err => {
  console.error('Error connecting to Redis', error);
});
client.on('connect', () => {
    console.log(`Connected to Redis.`)
    const port = process.env.PORT || 5001
    app.listen(port, () => {
      console.log(`Redis API server listening at http://localhost:${port}`);
    });
});
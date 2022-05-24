const express = require('express');
const app = express();
const movies = require('./routes/movies');
require('dotenv').config();

app.use(express.json());//uzywa expressa tka jak mialo
// na obrazku z getem uzywam curla "Dockerfile inicjalizować kontener w taki sposób, aby było możliwe wywołanie polecenia curl"
app.use('/movies', movies);

// Łączymy się z bazą i „stawiamy” serwer API
// Do kontaktu z serwerem Redis wykorzystamy bibliotekę IORedis
const client = require('./config/redisClient');

client.on('error', err => {
  console.error('Error connecting to Redis', err);
});
client.on('connect', () => {
    console.log(`Connected to Redis.`)
    const port = process.env.PORT || 5000//korzysta ze zmiennej srodowiskowej a jak nie to z portu 5000
    app.listen(port, () => {
      console.log(`Cala dystrybucja wzorowana na lab6 zadaniu 2-im. API server listening at http://localhost:${port}`);
    });
});
const express = require('express');
const app = express();
const animes = require('./routes/animes');
const voiceActors = require('./routes/voiceActors');
const cors = require('cors')
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}
app.use(cors(corsOptions));
app.use(express.json());

// „Podłączamy” obsługę „endpointów”, które zdefiniowaliśmy dla kolekcji 'animes' w katalogu routes/animes.js
app.use('/animes', animes);
app.use('/voiceActors', voiceActors);

require('dotenv').config();
const dbConnData = {
    host: process.env.MONGO_HOST || '127.0.0.1',
    port: process.env.MONGO_PORT || 27017,
    database: process.env.MONGO_DATABASE || 'animeApi'
};
// Łączymy się z bazą i „stawiamy” serwer API
// Do kontaktu z serwerem MongoDB wykorzystamy bibliotekę Mongoose

const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGO_URL, {//`mongodb://${dbConnData.host}:${dbConnData.port}/${dbConnData.database}`
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:true
  })
  .then(response => {
    console.log(`Connected to MongoDB. Database name: "${response.connections[0].name}"`)
    const port = process.env.PORT || 5000
    app.listen(port, () => {
      console.log(`API server listening at http://localhost:${port}`);
    });
  })
  .catch(error => console.error('Error connecting to MongoDB', error));


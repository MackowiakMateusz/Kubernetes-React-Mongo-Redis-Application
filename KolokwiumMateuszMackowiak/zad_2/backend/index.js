const express = require('express');

const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.json());

const { Pool } = require('pg');

const client = new Pool ({
    host: process.env.PGHOST,
    port: process.env.PGPORT ||5432,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD
});

client
  .connect()
  .then(() => {
    console.log('Connected to PostgreSQL');
    const port = process.env.PORT;
    client.query(`CREATE TABLE IF NOT EXISTS movie (
      id serial PRIMARY KEY,
      name VARCHAR UNIQUE NOT NULL,
      genre VARCHAR not NULL,
      releaseYear INT NOT NULL
    );`);
    app.listen(port, () => {
      console.log(`API server listening at http://localhost:${port}`);
    });
  })
  .catch(err => console.error('Connection error', err.stack));

app.get('/movies', async (req, res) => {
  const movies = await client.query("SELECT * FROM movie;")
  return res.send(movies.rows);
});

app.post('/movies', async (req, res) => {
  try {
    const insertedRow = await client.query("INSERT INTO movie (name, genre, releaseYear) VALUES ($1, $2, $3) RETURNING *", [ req.body.name, req.body.genre, req.body.releaseYear])

    return res.send(insertedRow.rows[0]);  
  } catch (ex) {
    return res.status(500).send(ex)
  }
});

app.get('/movies/:id', async (req, res) => {
  const id = req.params.id;
  const movie = await client.query("SELECT * FROM movie WHERE id = $1", [ id ])
  return res.send(movie.rows[0]);
});

app.delete('/movies/:id', async (req, res) => {
  const id = req.params.id;
  await client.query("DELETE FROM movie WHERE id = $1", [ id ])
  
  return res.status(200).send();
});

app.put('/movies/:id', async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
  await client.query("UPDATE movie SET name=$1, genre=$2, releaseYear=$3 WHERE id = $4", [ data.name, data.genre, data.releaseYear, id ])
  return res.send(data);
  } catch(ex) {
    return res.status(500).send(ex)
  }
});
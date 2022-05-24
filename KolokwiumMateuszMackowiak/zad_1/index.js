const express = require('express');
const app = express();

const cors = require('cors')

app.use(express.json());
app.use(cors())

const moviesArray = [];

app.get('/movies', async (req, res) => {
  return res.send(moviesArray);
});

app.post('/movies', async (req, res) => {
  moviesArray.push(req.body)
  return res.send(req.body);
});

const port = process.env.PORT

app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});



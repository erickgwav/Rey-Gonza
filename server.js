const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let locations = [];

app.post('/locations', (req, res) => {
  const location = req.body;
  locations.push(location);
  res.status(201).send(location);
});

app.get('/locations', (req, res) => {
  res.status(200).send(locations);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

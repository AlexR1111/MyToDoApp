const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose(); // verbose hilft beim fehler finden
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

const db = new sqlite3.Database('./tasks.db',(err) => {
  if (err) {
    console.error('Datenbank konnte nicht geöffnet werden', err.message);
  } else {
    console.log('Mit Datenbank verbunden');
  }
});

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {
  res.json({ message: 'Backend, meldet sich zum Dienst!' });
});

app.listen(port, () => {
  console.log(`Backend server läuft auf http://localhost:${port}`);
});

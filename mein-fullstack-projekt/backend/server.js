const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./tasks.db');
db.run ('CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, completed BOOLEAN)');

app.get('/api/tasks', (req, res) => {
  db.all('SELECT * FROM tasks', [], (err, rows) => {
    if (err) {
      return res.status(500).json({message: err.message});
    }
    res.json({tasks:rows});
  });
});

app.get('/api', (req, res) => {
  res.json({ message: 'Backend, meldet sich zum Dienst!' });
});

app.post('/api/tasks', (req, res) => {
  const {text, completed} = req.body;
  const query = 'INSERT INTO tasks (text, completed) VALUES (?,?)';
  db.run(query,[text, completed], function(err){
    if(err) {
      return res.status(500).json({message: err.message});
      }
    res.status(201).json({message: 'Task hinzugefügt', taskId: this.lastID});
  });
});

app.delete('/api/tasks/:id', (req, res) => {
  const {id} = req.params;
  const query = 'DELETE FROM tasks WHERE id = ?';
  db.run(query, id, function(err){
    if(err) {
      return res.status(500).json({message: err,nessage});
    }
    res.status(200).json({message: 'Task gelöscht', taskId: id});
  });
});

app.listen(port, () => {
  console.log(`Backend server läuft auf http://localhost:${port}`);
});


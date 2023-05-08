const express = require('express');
const fs = require('fs');
const uuid = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/notes', (req, res) => {
    request.sendfile(__dirname + '/public/notes.html')
});

app.get('/api/notes', (req, res) => {
    fs.readFile(__dirname + '/db/db.json', 'utf8', (err, data) => { 
      if (err) throw err; 
      const notes = JSON.parse(data); 
      res.json(notes); 
    });
  });
  
  
  app.post('/notes', (req, res) => {
    const newNote = req.body; 
    newNote.id = uuid.v4(); 
    fs.readFile(__dirname + '/db/db.json', 'utf8', (err, data) => { 
      if (err) throw err; 
      const notes = JSON.parse(data);
      notes.push(newNote); 
      fs.writeFile(__dirname + '/db/db.json', JSON.stringify(notes), (err) => { 
        if (err) throw err; 
        res.json(newNote); 
      });
    });
  });
  
  
  app.delete('/api/notes/:id', (req, res) => {
      const noteId = req.params.id;
      fs.readFile(__dirname + '/db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        let notes = JSON.parse(data);
        notes = notes.filter(note => note.id !== noteId);
        fs.writeFile(__dirname + '/db/db.json', JSON.stringify(notes), (err) => {
          if (err) throw err;
          res.json({ id: noteId });
        });
      });
    });
  
  
  app.get('*', (req, res) => {
      res.sendFile(__dirname + '/public/index.html');
    });
    
  
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
const express = require('express');
const path = require('path');
const NoteData = require("./db/db.json")
const PORT = 3001;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));
app.get('/', (req, res) => {
    console.log(path.join(__dirname,"index.html"))
    res.sendFile(path.join(__dirname, 'index.html'));
  });

app.get('/api/notes', (req, res) =>{
    res.json(NoteData)
});
app.get('/notes', (req, res) =>{
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});
const postReview = (review) =>
  fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(review),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log('Successful POST request:', data);
      return data;
    })
    .catch((error) => {
      console.error('Error in POST request:', error);
});


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });
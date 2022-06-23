const fs = require('fs');
const express = require('express');
const path = require('path');
let noteData = require('./db/db.json');

const PORT = process.env.PORT || 5500;

const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static('public'));
 
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
})

app.get('/api/notes', (req,res) => {
    return res.json(noteData);
});

app.post('/api/notes', (req,res) => {
    const body = req.body;
    noteData.push(body);
    return res.json('data was saved');
});

app.delete('api/notes/:id', (req,res) => {
    const id = req.params.id;
    console.log('id: ', id);
    noteData = noteData.filter((data,idx) => idx != id);
})


app.listen(PORT, () => {
    console.log(`Example app listenting at http://localhost${PORT}`);
})

const express = require('express');
const app = express();
const path = require('path');
const db = require('./db/db.json');
const PORT = process.env.PORT || 3001;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));


//main route
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);


//notes html page
app.get('/notes', (req,res) =>{
    res.sendFile(path.join(__dirname, '/public/notes.html'));
})


//reads the db file then returns all the saved notes
app.get('/api/notes', (req,res) =>{
    res.json(db);
})


//wildcard to defualt unknown pages to the home page
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

app.post('/api/notes', (req, res) =>{
    console.info(`${req.method} request received to add a note`);
    const { title, text, id } = req.body;
    const newNote = {
        title,
        text,
        id: db.length +1
    };

    db.push(newNote)
    fs.writeFile('./db/db.json', JSON.stringify(db));
})

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
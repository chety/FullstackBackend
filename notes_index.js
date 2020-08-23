let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: false,
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    date: '2019-05-30T18:39:34.091Z',
    important: false,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true,
  },
  {
    id: 4,
    content: 'chety is awsome',
    date: '2020-07-15T17:59:38.795Z',
    important: false,
  },
  {
    id: 5,
    content: 'zehru is ok',
    date: '2020-07-15T17:59:44.442Z',
    important: false,
  },
  {
    id: 6,
    content: 'Can Mirko',
    date: '2020-07-15T17:59:44.442Z',
    important: true,
  },
];

const express = require('express');
const cors = require('cors');

const app = express();
//It is used for CORS related errors
app.use(cors());

//it is used for POST methods. If it is not used, request body will be undefined
app.use(express.json());

app.get('/api/notes', (_, res) => {
  res.json(notes);
});

app.put('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((note) => note.id === id);
  note.important = !note.important;
  res.json(note);
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  notes.push(newNote);
  res
    .status(201)
    .send({ message: 'New note has successfully created', result: true });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is  running on port ${PORT}`);
});

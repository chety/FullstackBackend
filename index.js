let persons = [
  {
    id: 1,
    name: 'Chety Clooney',
    number: '+49-123-456',
  },
  {
    id: 2,
    name: 'Kayzer Amokachi',
    number: '+44-658-321',
  },
  {
    id: 3,
    name: 'Lionel Messi',
    number: '+1-200-400',
  },
  {
    id: 4,
    name: 'Christiano Ronaldo',
    number: '+20-1999-2222',
  },
];

const express = require('express');
const cors = require('cors');
const app = express();

const morgan = require('morgan');
app.use(morgan('tiny'));
const { requestLogger, unknownEndPoint } = require('./middleware');

/*
express json-parser is a middleware. It is mendatory otherwise in POST request
request body will be undefined.

The json-parser takes the raw data from the requests that's stored in the request object,
 parses it into a JavaScript object and assigns it to the request object as a new property body.
 */
app.use(express.json());

app.use(cors());
//Our custom middleware.
app.use(requestLogger);

app.get('/', (_, res) => {
  res.send('<h2>Backend is Cool. Awesome. </h2>');
});

app.get('/api/persons', (_, res) => {
  res.json(persons);
});

app.get('/info', (_, res) => {
  res.send(`<div>
          <p>PhoneBook has info for ${persons.length} people</p>
          <p>${new Date()}</p>
          <div>`);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (!person) {
    return res.status(404).json({
      code: 404,
      error: `User with id ${id} does not exist`,
    });
  }
  return res.json(person);
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((p) => p.id === id);
  if (person) {
    persons = persons.filter((p) => p.id !== id);
    return res.status(200).json({
      message: `User with id ${id} has been successfully deleted`,
      result: true,
    });
  }

  return res.status(404).json({
    message: `User not found`,
    result: false,
  });
});

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body;
  if (!name || !number) {
    return res.status(400).json({
      message: 'Name and number must be provided',
      result: false,
    });
  }
  const isUserExist = persons.some(
    (p) => p.name === name || p.number === number
  );
  if (isUserExist) {
    return res.json({
      message: 'A user with the same name or number is already exist',
      result: false,
    });
  }

  const person = {
    name,
    number,
    id: Math.floor(Math.random() * 100),
  };
  persons.push(person);
  res.json(person);
});

app.use(unknownEndPoint);

const port = 3001;
app.listen(port);
console.log(`Our humble app is running on ${port}`);

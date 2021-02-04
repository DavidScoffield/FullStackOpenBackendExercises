const express = require('express')
const app = express()

app.use(express.json())

let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1,
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2,
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3,
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4,
  },
  {
    name: 'Mary Archia',
    number: '39-23-663233122',
    id: 5,
  },
  {
    name: 'jose adwaendieck',
    number: '39-21*55423122',
    id: 6,
  },
  {
    name: 'Ban Armenio',
    number: '39-23-6423122',
    id: 7,
  },
]

const generateRandomID = () => Math.round(Math.random() * 1000000)

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
  const info = `<p>Phonebook has info for ${persons.length} people </p>
                <p>${new Date()} </p>`
  res.send(info)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find((person) => person.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter((person) => person.id !== id)

  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const id = generateRandomID()
  const person = req.body

  if (!(person.name && person.number)) {
    return res.status(404).json({
      error: 'Some parameter missing',
    })
  }

  persons = persons.concat(person)
  res.send('good')
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

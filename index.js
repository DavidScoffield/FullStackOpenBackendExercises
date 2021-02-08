require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

const generateRandomID = () => Math.round(Math.random() * 1000000)

const isInDiary = (name) => persons.find((person) => person.name === name)

app.get('/api/persons', (req, res) => {
  Person.find({}).then((returnedPersons) => {
    res.json(returnedPersons)
  })
})

app.get('/info', (req, res) => {
  Person.find({})
    .then((returnedPersons) => {
      const info = `<p>Phonebook has info for ${returnedPersons.length} people </p>
                  <p>${new Date()} </p>`
      res.send(info)
    })
    .catch((err) => console.log('Error:', error.message))
})

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id)
    .then((foundPerson) => {
      res.json(foundPerson)
    })
    .catch(() => {
      res.status(404).end()
    })
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter((person) => person.id !== id)

  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const id = generateRandomID()
  let person = req.body

  if (!(person.name && person.number)) {
    return res.status(404).json({
      error: 'Some parameter missing',
    })
  }

  if (isInDiary(person.name)) {
    return res.status(404).json({
      error: 'name must be unique',
    })
  }

  person = { ...person, id }

  persons = persons.concat(person)
  console.log(`-${person.name} is sucefully added!!`)
  res.send(person)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

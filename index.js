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

app.get('/info', (req, res, next) => {
  Person.find({})
    .then((returnedPersons) => {
      const info = `<p>Phonebook has info for ${returnedPersons.length} people </p>
                  <p>${new Date()} </p>`
      res.send(info)
    })
    .catch((err) => next(err))
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((foundPerson) => {
      res.json(foundPerson)
    })
    .catch((err) => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      console.log(` ✅ ${result.name} is sucefully removed!👌`)
      res.status(204).end()
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (req, res) => {
  let person = req.body

  if (!(person.name && person.number)) {
    return res.status(404).json({
      error: 'Some parameter missing',
    })
  }

  // if (isInDiary(person.name)) {
  //   return res.status(404).json({
  //     error: 'name must be unique',
  //   })
  // }

  person = new Person({ ...person })

  person
    .save()
    .then((savedPerson) => {
      console.log(` ✅ ${savedPerson.name} is sucefully added!!`)
      res.send(savedPerson)
    })
    .catch((error) => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }

  console.log(`❌ ${err.name}, ${err.message}`)

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }

  next(err)
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(` ✅ Server running on port ${PORT}`)
})

require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

// const generateRandomID = () => Math.round(Math.random() * 1000000)

// const isInDiary = (name) => persons.find((person) => person.name === name)

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
  const { id } = req.params
  Person.findById(id)
    .then((foundPerson) => {
      if (foundPerson) {
        res.json(foundPerson)
      } else {
        msgIdWrong({ res, id })
      }
    })
    .catch((err) => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
  const { id } = req.params

  Person.findByIdAndRemove(id)
    .then((result) => {
      if (result) {
        console.log(` ✅ ${result.name} is sucefully removed!👌`)
        res.status(204).end()
      } else {
        msgIdWrong({ res, id })
      }
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (req, res, next) => {
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
      res.json(savedPerson)
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body
  const { id } = req.params

  console.log(body, id)

  const person = {
    number: body.number,
  }

  Person.findByIdAndUpdate(id, person, { new: true, runValidators: true })
    .then((updatedPerson) => {
      if (updatedPerson) {
        console.log(` ✅ ${updatedPerson.name} is sucefully updated!!`)
        res.json(updatedPerson)
      } else {
        msgIdWrong({ res, id })
      }
    })
    .catch((error) => next(error))
})

const msgIdWrong = ({ res, id }) => {
  res.status(404).send({ error: `The id: ${id} does not exist` })
  console.log(`❌ ${id} does not exist`)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }

  console.log(`❌ ${err.name}, ${err.message}`)

  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
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

const mongoose = require('mongoose')

const dbname = 'persons'

const numberOfArguments = process.argv.length

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://DavidScoffield:${password}@fullstackopen.k2jua.mongodb.net/${dbname}?retryWrites=true&w=majority`

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Person = mongoose.model('Person', personSchema)

const getAllPersons = () => {
  Person.find({}).then((persons) => {
    console.log('phonebook:')
    persons.forEach(({ name, number }) => {
      console.log(name, number)
    })
    mongoose.connection.close()
  })
}

const savePerson = (person) => {
  person.save().then((result) => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
  })
}

const addPerson = (name, number) => {
  const person = new Person({
    name,
    number,
  })
  savePerson(person)
}

if (numberOfArguments < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
} else if (numberOfArguments === 3) {
  getAllPersons()
} else if (numberOfArguments === 5) {
  addPerson(name, number)
} else {
  console.log(
    'Please provide the name and number as arguments: node mongo.js password <name> <number>'
  )
  process.exit(1)
}

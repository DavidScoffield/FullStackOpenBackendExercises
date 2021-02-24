require('express-async-errors')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('../utils/blogs_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initializeBlogs.map((b) => new Blog(b))
  const promiseArray = blogObjects.map((b) => b.save())
  await Promise.all(promiseArray)
})

test('GET de blogs recibe un json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('obtener la cantidad correcta de blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initializeBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})

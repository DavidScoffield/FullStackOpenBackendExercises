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

test('se agrego un nuevo blog a la BD', async () => {
  const newBlog = {
    title: 'Marco en apuros',
    author: 'David',
    url: 'ficticia.com.ar',
    likes: '1500',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-type', /application\/json/)

  const response = await helper.blogsInDb()
  expect(response).toHaveLength(helper.initializeBlogs.length + 1)

  const titles = response.map((r) => r.title)
  expect(titles).toContain('Marco en apuros')
})

afterAll(() => {
  mongoose.connection.close()
})

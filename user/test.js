require('./user.js'); // which executes 'mongoose.connect()'


const mongoose = require('mongoose')
const databaseName = 'User'

beforeAll(async () => {
  const url = `mongodb+srv://admin:admin123@assignment.lhvje.mongodb.net/${databaseName}?retryWrites=true&w=majority`
  await mongoose.connect(url, { useNewUrlParser: true })
})
const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors  =  require('cors')
const mongoose = require('mongoose')
const cors = require('cors')
mongoose.connect("mongodb+srv://admin:admin123@assignment.lhvje.mongodb.net/Orders?retryWrites=true&w=majority",
{ useNewUrlParser: true, useUnifiedTopology: true, });
mongoose.Promise =global.Promise;
var database = mongoose.connection;
database.once('open', () => { console.log("Connected") })
database.on('err', (error) => {
    console.log(error)
})

const orderRoute = require('./api/routes/orderController')

app.use(cors())
app.use(bodyParser.json())
app.use(cors())
app.use('/order',orderRoute)





const server = http.createServer(app)

server.listen(3005,()=>{
    console.log('I am running on port 3005')
})

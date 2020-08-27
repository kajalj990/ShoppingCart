const http = require('http')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

const cartRoute = require('./api/routes/cartController')
//database connection
mongoose.connect("mongodb+srv://admin:admin123@assignment.lhvje.mongodb.net/Cart?retryWrites=true&w=majority",
{ useNewUrlParser: true, useUnifiedTopology: true, });
mongoose.Promise =global.Promise;
var database = mongoose.connection;
database.once('open', () => { console.log("Connected") })
database.on('err', (error) => {
    console.log(error)
})
app.use(cors())
app.use(bodyParser.json())

app.use('/cart',cartRoute)

const server = http.createServer(app)

server.listen(3004,()=>{
    console.log(" i am listening on port 3004");
})

const http = require('http')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

mongoose.connect("mongodb+srv://admin:admin123@assignment.lhvje.mongodb.net/Items?retryWrites=true&w=majority",
{ useNewUrlParser: true, useUnifiedTopology: true, });
mongoose.Promise =global.Promise;
var database = mongoose.connection;
database.once('open', () => { console.log("Connected") })
database.on('err', (error) => {
    console.log(error)
})

const product = express();

const productRoutes = require('./api/routes/productController')
product.use('/uploads',express.static('uploads'))
product.use(cors())
product.use(bodyParser.json())
product.use('/products',productRoutes)



const server = http.createServer(product)
server.listen(3002,()=>{
    console.log("I am listening on Port 3002");
})
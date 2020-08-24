const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const userRoutes = require('./api/routes/user')

const app = express();
//database connection
mongoose.connect("mongodb+srv://admin:admin123@assignment.lhvje.mongodb.net/User?retryWrites=true&w=majority",
{ useNewUrlParser: true, useUnifiedTopology: true, });
mongoose.Promise =global.Promise;
var database = mongoose.connection;
database.once('open', () => { console.log("Connected") })
database.on('err', (error) => {
    console.log(error)
})

app.use(bodyParser.json());

app.get('/',(req,res)=>{
    console.log('successfully started')
    res.send("Ready to go")
})

//Routes which should handle request
app.use('/user',userRoutes)


app.listen(3001,()=>{
    console.log("on port 3001")
})
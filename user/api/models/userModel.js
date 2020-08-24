const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    name: {
        type: String,
        require: true,
    },
    gender: {
        type: String,
        require: true,
    },
    phoneNo: {
        type: Number,
        require: true,

    },
    address: {
        type: String,
        require: true
    },
    emailId: {
        type: String,
        unique: true,
        require: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        require: true,
    },
    userType: {
        type: String,
        default: 'Customer'
    }
})

module.exports = mongoose.model('User', userSchema)

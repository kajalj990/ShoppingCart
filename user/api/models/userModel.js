const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    phoneNo: {
        type: Number,
        required: true,

    },
    address: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        unique: true,
        required: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        default: 'customer'
    }
})

module.exports = mongoose.model('User', userSchema)

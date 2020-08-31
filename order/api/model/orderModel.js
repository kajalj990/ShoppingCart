const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    orderId : mongoose.Schema.Types.ObjectId,
    cartId :{
        type: mongoose.Schema.Types.ObjectId,
        require:true
    },
    customerId :{
        type: mongoose.Schema.Types.ObjectId,
        require:true
    },
    orderdDate : {
        type: Date,
        require : true
    }
})

module.exports = mongoose.model('Orders',orderSchema)
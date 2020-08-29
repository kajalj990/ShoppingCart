const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    items: [{
        productId: mongoose.SchemaTypes.ObjectId,
        quantity: { type: Number, default: 1 }
    }],
    customerId: { type: mongoose.Schema.Types.ObjectId, require: true },
    total: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: 'PENDING'
    }
})

module.exports = mongoose.model('Cart', cartSchema)
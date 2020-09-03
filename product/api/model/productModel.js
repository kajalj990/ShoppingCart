const mongoose = require('mongoose')


const productSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    productName : {
        type:String,
        required:true
    },
    price :{
        type:Number,
        required:true
    },
    productImage :{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required: true
    },
    category:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
})

productSchema.index({productName:'text',category:'text',description:'text'})
module.exports = mongoose.model('Products',productSchema)
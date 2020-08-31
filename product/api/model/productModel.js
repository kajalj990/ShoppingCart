const mongoose = require('mongoose')


const productSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    productName : {
        type:String,
        require:true
    },
    price :{
        type:Number,
        require:true
    },
    productImage :{
        type:String,
        require:true
    },
    quantity:{
        type:Number,
        require: true
    },
    category:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    }
})

productSchema.index({productName:'text',category:'text',description:'text'})
module.exports = mongoose.model('Products',productSchema)
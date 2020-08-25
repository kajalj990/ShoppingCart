const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const Product = require('../model/productModel')
const multer = require('multer') //used for storing images in db
const storage = multer.diskStorage({
    //creates the directory to store images 
    destination: function (req, fil, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
});

//Checks the file type
const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};


const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})

//getting all the products category wise
router.get('/', (req, res, next) => {
    Product.find().sort({category:-1}).exec().then(result => {
        res.status(200).json({
            count: result.length,
            products: result.map(prod => {
                return {
                    _id: prod._id,
                    productName: prod.productName,
                    price: prod.price,
                    image: prod.productImage,
                    quantity: prod.quantity,
                    category: prod.category,
                    description: prod.description,
                    request: {
                        type: 'Post',
                        url: 'http://localhost:3002/products/product',
                        description: 'Add new product'
                    }
                }
            })
        })
    }).catch(err => {
        res.status(500).json({
            message: "no products available",
            error: err
        })
    })
})
//adding products in data base 
router.post('/',upload.single('productImage'), (req, res, next) => {
    Product.find({ productName: req.body.name }).exec()
        .then(product => {
                const newProduct = new Product({
                    _id: mongoose.Types.ObjectId(),
                    productName: req.body.productName,
                    price: req.body.price,
                    productImage: req.file.path,
                    quantity: req.body.quantity,
                    category: req.body.category,
                    description: req.body.description
                })
                newProduct.save().then(result => {
                    res.status(201).json({
                        message: "Product saved successfully",
                        createdProduct: {
                            productName: result.productName,
                            price: result.price,
                            productImage: result.productImage,
                            quantity: result.quantity,
                            category: result.category,
                            description: result.description
                        },
                        result:{
                            type:'GET',
                            url:'http://localhost:3002/products/',
                            description:"to see all the products"
                        }
                    })
                }).catch(err => {
                        res.status(500).json({
                            error:err
                        })
                })
            
        })
})

//finding product by Id
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(doc => {
            console.log("from database", doc);
            if (doc) {
                res.status(200).json({
                    product: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3002/products/' + id
                    }
                }
                );
            }
        }).catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
        });
})

//updating the products
router.patch('/:productId',(req, res, next) => {
    const id = req.params.productId;
    const updateOps = {}
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.update({ _id: id }, { $set: updateOps }).exec().then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Product update',
            request: {
                type: 'PATCH',
                url: 'http://localhost:3002/products/' +id
            }
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})
router.post('/update', (req, res) => {
    let data = req.body.products;
    console.log(data);
    function callback() {
      res.json({
        'result': 'Successfuly updated Stocks',
      });
    }
    for (let index = 0; index < data.length; index++) {
      const currentProduct = data[index];
      Product.findById(currentProduct.id)
        .exec()
        .then((databaseObject) => {
            console.log(databaseObject);
          databaseObject.quantity -= currentProduct.quantity;
          databaseObject.save();
          if (index === data.length - 1) callback();
        });
    }
  });
  

//deleting the products with id
router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId
    Product.remove({ _id: id }).exec().then(result => {
        res.status(200).json({
            message: 'the product at ' + id + ' has been deleted ',
            request: {
                type: 'POST',
                url: 'http://localhost:3002/products',
                body: { name: 'String', price: 'Number' }
            }
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err })
    })

})

//finding products by category
router.get('/category/:category', (req, res, next) => {
    Product.find({category: req.params.category })
        .select('productName price _id productImage quantity description')
        .exec()
        .then(product => {
            console.log("from database", product);
            if (product) {
                res.status(200).json({
                    product: product,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3002/products/' 
                    }
                }
                );
            }
        }).catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
        });
})

//finding products by its name
router.get('/product/:prodName', (req, res, next) => {
    Product.find({ productName : req.params.prodName})
        .select('productName price _id productImage quantity description')
        .exec()
        .then(product => {
            console.log("from database", product);
            if (product) {
                res.status(200).json({
                    product: product,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3002/products/' 
                    }
                }
                );
            }
        }).catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
        });
})



module.exports = router
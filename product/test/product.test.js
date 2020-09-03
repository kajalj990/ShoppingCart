const chai = require('chai')
const chaiHttp = require('chai-http')
const product = require('../product')
const should = chai.should();
chai.use(chaiHttp)

const url = 'http://localhost:3002/products'
describe('get all products',()=>{
    it('get all products',(done)=>{
        chai.request(url)
        .get('/')
        .end((err,res)=>{
          res.should.have.status(200)
          res.body.products.should.be.a('Array')
          done();
        })
    })
})
describe('get product By productId',()=>{
    
    it('get product by productId',(done)=>{
        const productId ='5f4241fcc67f3108380b9c3d'
        chai.request(url)
        .get('/'+productId)
        .end((err,res)=>{
          res.should.have.status(200)
          res.body.product.should.be.a('Object')
          res.body.product.should.have.property('_id')
          res.body.product.should.have.property('productName')
          res.body.product.should.have.property('price')
          res.body.product.should.have.property('productImage')
          res.body.product.should.have.property('quantity')
          res.body.product.should.have.property('category')
          res.body.product.should.have.property('description')
          done();
        })
    })
    it('should not found product with non existence of productId',(done)=>{
        const productId ='5f4241fcc67f3108380b9cfd'
        chai.request(url)
        .get('/'+productId)
        .end((err,res)=>{
          res.should.have.status(404)
          done();
        })
    })
    it('should not get product by productId with wrong productId',(done)=>{
        const productId ='5f4241fcc67f3108380b9d'
        chai.request(url)
        .get('/'+productId)
        .end((err,res)=>{
          res.should.have.status(500)
          done();
        })
    })
})

describe('Adding products',()=>{
    // it('adding products in database',(done)=>{
    //     const product ={ 
    //     productName:"Testproduct", 
    //     price: 200,
    //     productImage: "https://i.gadgets360cdn.com/products/large/realme-smart-tv-43-db-800x450-1590390507.jpg" ,
    //     quantity: 10,
    //     category: "television",
    //     description: "45 inch ,Ultra HD,black"       
    //     }
    //     chai.request(url)
    //     .post('/')
    //     .send(product)
    //     .end((err,res)=>{
    //         res.should.have.status(201)
    //         res.body.createdProduct.should.be.a('Object')
    //         done()
    //     })
    // })
    it('should not add products in database',(done)=>{
        const product ={ 
        productName:"Testproduct", 
        price: 200,
        productImage: "" ,
        quantity: 10,
        category: "",
        description: "45 inch ,Ultra HD,black"       
        }
        chai.request(url)
        .post('/')
        .send(product)
        .end((err,res)=>{
            res.should.have.status(500)
            done();
        })
    })
})

describe('updating the product',()=>{
    it('update product by Id',(done)=>{
        const product ={ 
        "productName": "Testproduct",
        "price": 1,
        "productImage": "https://i.gadgets360cdn.com/products/large/realme-smart-tv-43-db-800x450-1590390507.jpg",
        "quantity": 10,
        "category": "Television",
        "description": "45 inch ,Ultra HD,black"      
            }
        const productId = "5f42391ec67f3108380b9c2e"
        chai.request(url)
        .patch('/'+productId)
        .send(product)
        .end((err,res)=>{
            res.should.have.status(204)
            done();
        })
    })
    it('should not update product by wrong Id',(done)=>{
        const product ={ 
        "productName": "Testproduct",
        "price": 1,
        "productImage": "https://i.gadgets360cdn.com/products/large/realme-smart-tv-43-db-800x450-1590390507.jpg",
        "quantity": 10,
        "category": "Television",
        "description": "45 inch ,Ultra HD,black"      
            }
        const productId = "5f42391ec67f3108380b9c2p"
        chai.request(url)
        .patch('/'+productId)
        .send(product)
        .end((err,res)=>{
            res.should.have.status(500)
            done();
        })
    })
    // it('updates only quantity of multiple products ',(done)=>{
    //     const products ={ 
    //         "productName": "Testproduct",
    //         "price": 1,
    //         "productImage": "https://i.gadgets360cdn.com/products/large/realme-smart-tv-43-db-800x450-1590390507.jpg",
    //         "quantity": 10,
    //         "category": "Television",
    //         "description": "45 inch ,Ultra HD,black"      
    //         }
    //     chai.request(url)
    //     .post('/update')
    //     .send(products)
    //     .end((err,res)=>{
    //         res.should.have.status(204);
    //         done();
    //     })
    // })
    
})

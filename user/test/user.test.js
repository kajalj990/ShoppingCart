
const chai = require('chai')
const chaiHttp = require('chai-http')
const user = require('../user')
const should = chai.should();
const {response} = require('express')
chai.use(chaiHttp)

/***Get all user */

describe('get all user',()=>{
    it('get all users acc',(done)=>{
        chai.request('http://localhost:3001/user')
        .get('/AllUser')
        .end((err,res)=>{
          res.should.have.status(200)
          res.body.should.be.a('object')
          done();
        })
    })
})

/**GET user by user _id */

describe('Get user by Id',()=>{
    it('customer by Id',(done)=>{
        const customerId = '5f4c86225627842e6818df02'
        chai.request('http://localhost:3001/user')
        .get('/'+customerId)
        .end((err,res)=>{
            res.should.have.status(200)
            res.body.should.be.a('Object')            
            res.body.result.should.have.property('userType')
            console.log(res.body.result)
            res.body.result.should.have.property('_id').eq('5f4c86225627842e6818df02')
            res.body.result.should.have.property('name')
            res.body.result.should.have.property('gender')
            res.body.result.should.have.property('address')
            res.body.result.should.have.property('phoneNo')
            res.body.result.should.have.property('emailId')
            res.body.result.should.have.property('password')
            done();
        })
    })
    it('should not fetch customer by Id',(done)=>{
        const customerId = '5f4c86225927842e6818df92'
        chai.request('http://localhost:3001/user')
        .get('/'+customerId)
        .end((err,res)=>{
            res.should.have.status(404)    
           // res.body.eq(null)     
            done();
        })
    })
})

// /**User signup  */

describe('Signup for customer',()=>{
    it('resgistration',(done)=>{
        const user ={ 
        name:"Test", 
        gender: "f",
        phoneNo:  7895462133,
        address: "location 410302" ,
        emailId: "test123@gmail.com",
        password: "test123"       
        
        }
        chai.request('http://localhost:3001/user')
        .post('/signup')
        .send(user)
        .end((err,res)=>{
            res.should.have.status(201)
            done();
        })
    })


    it('Mail already exists ',(done)=>{
        const user ={ 
            name:"Test", 
            gender: "f",
            phoneNo:  7895462133,
            address: "location 410302" ,
            emailId: "test123@gmail.com",
            password: "test123"
            }
            chai.request('http://localhost:3001/user')
            .post('/signup')
            .send(user)
            .end((err,res)=>{
                res.should.have.status(409)
                res.body.should.have.property('message')
                done();
            })
    })
    it('If any field is not there it should not save',(done)=>{
        const user ={ 
            name:"Test", 
            gender: "f",
            phoneNo:  7895462133,
            address: "location 410302" ,
            emailId: "",
            password: "test123"
            }
            chai.request('http://localhost:3001/user')
            .post('/signup')
            .send(user)
            .end((err,res)=>{
                res.should.have.status(500)
                res.body.should.have.property('error')
                done();
            })
    })
})


//******************LOGIN******** */
describe('Login',()=>{
    it('should get Logged In',(done)=>{
        const user={
            emailId:"test123@gmail.com",
            password:"test123"
        }
        chai.request('http://localhost:3001/user')
        .post("/login")
        .send(user,process.env.JWT_KEY='secrete')
        .end((err,res)=>{
            res.should.have.status(200)
            res.body.should.have.property('token')
            res.body.should.have.property('userId')
            res.body.should.have.property('userType')
            done();
        })
    })
    
    
})
const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt')
const User = require('../models/userModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

//Creating a new user
router.post("/signup", (req, res, next) => {
  //Checks if email aleardy exists
    User.find({ emailId: req.body.emailId }) 
      .exec()
      .then(user => {
        console.log(user)
        if (user.length >= 1) {
          return res.status(409).json({
            message: "Mail exists"
          });
        } else {
          //bcrypt used to secure the password
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({
                  error:err
              });
            } else {
              const user = new User({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                gender:req.body.gender,
                address:req.body.address,
                phoneNo:req.body.phoneNo,
                emailId: req.body.emailId,
                password: hash,
                userType:req.body.userType
              });
              user
                .save()
                .then(result => {
                  console.log(result);
                  res.status(201).json({
                    message: "User created"
                  });
                })
                .catch(err => {
                  console.log(err);
                  res.status(500).json({
                    error: err
                  });
                });
            }
          });
        }
      });
  });

router.get('/AllUser',(req, res, next) => {
    User.find().select('name gender address phoneNo emailId password userType')
        .exec().then(result => {
            res.status(200).json({
                count: result.length,
                users: result.map(doc => {
                    return {
                        _id: doc.id,
                        name: doc.name,
                        gender: doc.gender,
                        address:doc.address,
                        phoneNo:doc.phoneNo,
                        emailId:doc.emailId,
                        password:doc.password,  
                        userType:doc.userType
                    }
                })
            })
        }).catch(err=>{
            console.log(err)
            res.status(500).json({
                message:"data not found",
                error:err
            })
        })
})


//to login 
router.post("/login", (req, res, next) => {
  console.log(req.body.emailId)
  User.find({ emailId: req.body.emailId })
    .exec()
    .then(user => {
      console.log(user[0]._id)
      if (user.length < 1) {
        return res.status(401).json({
          message: "One more parameter require"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Login Failed"
          });
        }
        if (result) {
          const token = jwt.sign( 
            {
              emailId: user[0].emailId,
              userId: user[0]._id
            },
            process.env.JWT_KEY,
            { 
                expiresIn: "1h"
            }
          );
          console.log(token)
          return res.status(200).json(
            {
            message: "Auth successful",
            userId : user[0]._id,
            userType:user[0].userType,
            token: token
          });
          
        }
        res.status(401).json({
          message: "Auth failed"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});


//to delete the user
router.delete("/:userId", (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get('/:customerId',(req, res, next) => {
  User.findOne({ _id : req.params.customerId}).select('name gender address phoneNo emailId password userType')
      .exec().then(result => {
          res.status(200).json({
              count: result.length,
              result: result
             
          })
      }).catch(err=>{
          console.log(err)
          res.status(500).json({
              message:"data not found",
              error:err
          })
      })
})



module.exports = router
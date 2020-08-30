const express = require('express');
const router = express.Router();
const Cart = require('../model/cartModel');
const mongoose = require('mongoose');
const axios = require('axios');

// router.post('/', (req, res) => {
//   console.log(req.body);
//   console.log('Called me post from cart');
//   // const id =  req.body.productId
//   const user = req.body.userId;
//   console.log(user);
//   const item = {
//     productId: req.body.productId,
//     quantity: parseInt(req.body.quantity),
//   };
//   console.log(item);
//   Cart.findOne({ customerId: user })
//     .exec()
//     .then((foundCart) => {
//       if (foundCart) {
//         const index = foundCart.items.findIndex(
//           (currentItem) => currentItem.productId == item.productId
//         );
//         if (index == -1) {
//           foundCart.items.push(item);
//         } else {
//           itemToBeUpdated = foundCart.items[index];
//           itemToBeUpdated.quantity += item.quantity;
//         }
//         foundCart.save().then((result) => {
//           console.log(result);
//           res.json({ cart: result });
//         });
//       } else {
//         const newCart = new Cart({
//           _id: mongoose.Types.ObjectId(),
//           items: [
//             {
//               productId: mongoose.mongo.ObjectID(req.body.productId),
//               quantity: req.body.quantity,
//             },
//           ],
//           customerId: mongoose.mongo.ObjectId(user),
//         });
//         newCart
//           .save()
//           .then((result) => {
//             console.log(result);
//             res.json({
//               cart: result,
//             });
//           })
//           .catch((err) => {
//             res.json({ error: err });
//           });
//       }
//     });
// });

router.post('/', async (req, res) => {
  const item = {
    productId: req.body.productId,
    quantity: parseInt(req.body.quantity),
  };
<<<<<<< HEAD
  console.log(item)
  Cart.findOne({ customerId: user })
    .exec()
    .then((foundCart) => {
      console.log(foundCart);
      if (foundCart) {
        const index = foundCart.items.findIndex(
          (currentItem) => currentItem.productId == item.productId
        );
        if (index == -1) {
          foundCart.items.push(item);
        } else {
          itemToBeUpdated = foundCart.items[index];
          itemToBeUpdated.quantity += item.quantity;
        }
        foundCart.save().then((result) => {
          console.log(result)
          res.json({cart: result });
        });


      } else {
          const newCart = new Cart({
            _id: mongoose.Types.ObjectId(),
            items: [
              {
                productId: mongoose.mongo.ObjectID(req.body.productId),
                quantity: req.body.quantity,
              },
            ],
            customerId: mongoose.mongo.ObjectId(user),
          });
          newCart
            .save()
            .then((result) => {
              console.log(result);
              res.json({
                cart: result,
              });
            })
            .catch((err) => {
              res.json({ error: err });
            });
         }
        
      
=======
  try {
    const foundCart = await Cart.findById(req.body.cartId);
    if (!foundCart) return res.status(404).json({ msg: 'Cart not found' });
    if (foundCart.status === 'CHECKEDOUT')
      return res.status(404).json({ msg: 'Cart already checked out' });
    const index = foundCart.items
      .map((currentItem) => currentItem.productId)
      .indexOf(item.productId);
    if (index == -1) {
      foundCart.items.push(item);
    } else {
      itemToBeUpdated = foundCart.items[index];
      itemToBeUpdated.quantity += item.quantity;
    }
    foundCart.save().then((result) => {
      res.json({ cart: result });
>>>>>>> 005747b8df99aceadce0e681fccda12c3d4f3c5d
    });
  } catch (error) {
    console.log(error);
    res.status(500).json('Server Error');
  }
});

<<<<<<< HEAD

=======
// //to get all  the cart details of all users
router.get('cart/:userId', (req, res) => {
  console.log();
  Cart.find({ customer: req.params.userId })
    .exec()
    .then((foundCart) => {
      res.json({
        cart: foundCart,
      });
    })
    .catch((err) => {
      res.json({
        error: err,
      });
    });
});
>>>>>>> 005747b8df99aceadce0e681fccda12c3d4f3c5d

//to get the cart with details of product and user

router.get('/:cartId', (req, res) => {
  console.log('from get cart by cartID' + req.params.cartId);
  Cart.findById(req.params.cartId)
    .exec()
    .then((foundCart) => {
      axios
        .get('http://localhost:3001/user/' + foundCart.customerId)
        .then(async (user) => {
          var prodlist = {
            productId: ' ',
            productName: ' ',
            price: ' ',
            quantity: ' ',
          };
          var cart = {
            customer: { _id: ' ', name: ' ' },
            productList: [],
            TotalPrice: 0,
          };
          cart.customer._id = user.data.result._id;
          cart.customer.name = user.data.result.name;
          for (let index = 0; index < foundCart.items.length; index++) {
            let currentProduct = JSON.parse(JSON.stringify(prodlist));
            currentProduct.productId = foundCart.items[index].productId;
            currentProduct.quantity = foundCart.items[index].quantity;
            await axios
              .get('http://localhost:3002/products/' + currentProduct.productId)
              .then((productFound) => {
                currentProduct.productName =
                  productFound.data.product.productName;
                currentProduct.price = productFound.data.product.price;
                cart.productList.push(currentProduct);
<<<<<<< HEAD
                
                cart.TotalPrice+=productFound.data.product.price
              }).catch(err=>{
                cart.productList.push(null)
                res.json("no products in the cart")
              })
=======

                cart.TotalPrice += productFound.data.product.price;
              });
>>>>>>> 005747b8df99aceadce0e681fccda12c3d4f3c5d
          }
          res.json(cart);
        });
    });
});

router.delete('/:cartId', (req, res) => {
  Cart.remove({_id:req.params.cartId})
    .exec()
    .then(foundCart => {
      res.send("cart deleted")
    });
});
//on hold
// to update the qunatity of product added to cart
router.patch('/:cartId', (req, res) => {
  const item = {
    productId: req.body.productId,
    quantity: req.body.quantity,
  };
  Cart.findOne(req.params.customerId).then((foundCart) => {
    const index = foundCart.items.findIndex(
      (currentItem) => currentItem.productId == item.productId
    );
    itemToBeUpdated = foundCart.items[index];
    itemToBeUpdated.quantity -= item.quantity;
    foundCart.save().then((result) => {
      res.json({ result: result });
    });
  });
});

//to remove products from the cart
<<<<<<< HEAD
router.patch('/cart/:cartId/:productId',(req,res)=>{
  const item = {
    productId: req.body.productId,
   // quantity: req.body.quantity,
  };
  
  Cart.findById({_id:req.params.cartId}).then(foundCart=>{
    console.log(foundCart)
    const index = foundCart.items.findIndex(
     
      (currentItem) => currentItem.productId == item.productId
    );
    console.log(index)
        foundCart.items[index].remove()
        console.log('removed')   
    foundCart.save().then(result =>{
      axios
      .get('http://localhost:3001/user/' + result.customerId)
      .then(async (user) => {
        var prodlist = { productId: ' ', productName: ' ', price:' ' ,quantity: ' ' };
        var cart = {
          customer: { _id: ' ', name: ' ' },
          productList: [],
          TotalPrice :0
        };
        cart.customer._id = user.data.result._id;
        cart.customer.name = user.data.result.name;
        for (let index = 0; index < result.items.length; index++) {
          let currentProduct = JSON.parse(JSON.stringify(prodlist));
          currentProduct.productId =result.items[index].productId;
          currentProduct.quantity = result.items[index].quantity;
          await axios
            .get('http://localhost:3002/products/' + currentProduct.productId)
            .then((productFound) => {
              currentProduct.productName =
                productFound.data.product.productName;
                currentProduct.price =productFound.data.product.price 
              cart.productList.push(currentProduct);
              
              cart.TotalPrice+=productFound.data.product.price
            }).catch(err=>{
              cart.productList.push(null)
              res.json("no products in the cart")
            })
        }
        res.json(cart);
      })
  })
})
})
=======
// router.patch('/cart/:cartId/:productId', (req, res) => {
//   const item = {
//     productId: req.body.productId,
//     // quantity: req.body.quantity,
//   };

//   Cart.findByIdAndDelete({ _id: req.params.cartId }).then((foundCart) => {
//     console.log(foundCart);
//     const index = foundCart.items.findIndex(
//       (currentItem) => currentItem.productId == item.productId
//     );
//     console.log(index);
//     foundCart.items[index].remove();
//     console.log('removed');
//     foundCart.save().then((result) => {
//       res.json({ result: result });
//     });
//   });
// });

router.patch('/cart/:cartId/:productId', async (req, res) => {
  const productToBeDeleted = req.params.productId;
  try {
    const cart = await Cart.findById(req.params.cartId);
    if (!cart || cart.status === 'CHECKEDOUT')
      return res
        .status(400)
        .send({ msg: 'Cart doesnt exist or already checked out' });

    const index = cart.items
      .map((currentItem) => currentItem.productId)
      .indexOf(productToBeDeleted);

    if (index === -1)
      return res.status(404).send({ msg: 'Cart doesnt have the item' });

    cart.items[index].remove();
    await cart.save();
    res.json(cart);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error on Delete product');
  }
});

/**
 * @api /cart/user/:userId
 * @desc Fetches a cart with status pending
 */
router.post('/user/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({
      customerId: req.params.userId,
      status: 'PENDING',
    });
    if (!cart) {
      const newCart = new Cart({
        _id: mongoose.Types.ObjectId(),
        customerId: req.params.userId,
      });
      await newCart.save();
      return res.send(newCart);
    }
    res.send(cart);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});
>>>>>>> 005747b8df99aceadce0e681fccda12c3d4f3c5d

/**
 * @api /cart/user/:userId
 * @desc Update cart status
 */
router.patch('/user/:cartId', async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      {
        _id: req.params.cartId,
        status: 'PENDING',
      },
      { status: 'CHECKEDOUT' },
      { new: true }
    );
    if (!cart) {
      return res
        .status(400)
        .send({ msg: 'Cart doesnt exist or already checked out' });
    }
    res.send(cart);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

router.get('/', (req, res) => {
  Cart.find()
    .exec()
    .then((result) => {
      res.json({
        result: result,
      });
    })
    .catch((err) => {
      res.json({
        error: err,
      });
    });
});

module.exports = router;

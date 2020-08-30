const express = require('express');
const mongoose = require('mongoose');
const orderModel = require('../model/orderModel');
const router = express.Router();
const Order = require('../model/orderModel');
const axios = require('axios');

/**
 * @api /order
 * @desc Updates stock, updates cart status, generates a new order
 */
router.post('/', async (req, res) => {
  const newOrder = new Order({
    _id: mongoose.Types.ObjectId(),
    cartId: mongoose.Types.ObjectId(req.body.cartId),
    customerId: mongoose.Types.ObjectId(req.body.userId),
    orderdDate: Date.now(),
  });

  try {
    // Fetch Cart
    const response = await axios.get(
      'http://localhost:3004/cart/user/' + req.body.cartId
    );
    console.log('Fetch Cart');

    if (!response) return res.json({ msg: 'Cart not found' });
    if (response.data.items.length === 0)
      return res.json({ msg: 'Cart is empty' });
    if (response.data.status === 'CHECKOUT') return res.json({ msg: 'Cart already checked out' });

    // Creat a product array
    const prodlist = [];
    response.data.items.forEach((item) => {
      currentProduct = {
        id: item.productId,
        quantity: +item.quantity,
      };
      prodlist.push(currentProduct);
    });

    // Update Stocks
    await axios.post('http://localhost:3002/products/update', {products: prodlist})
    console.log('Stocks Updated');
    // Update Status
    await axios.patch('http://localhost:3004/cart/user/' + req.body.cartId)
    .catch(error => {
      throw Error('Error while updating cart status');
    })

    const order = await newOrder.save();
    console.log('Updated cart status');
    return res.json({msg: 'Successfully Checked Out'});
    
    
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

/**
 * @api /order/history/:userId
 * @desc Fecthes all purchases of the user
 */
router.get('/history/:userId', async (req, res) => {
  try {
    const orders = await Order.find({customerId: req.params.userId}).lean();
    // console.log(orders);
    const response = await axios.get('http://localhost:3004/cart/user/all/' + req.params.userId);
    // Modified order
    const detailedOrder = orders.map(order => {
      cart = response.data.filter(c => c._id === order.cartId.toString() && c.status!='PENDING');
      return {...order, cart: {...cart}};
    });
    res.send(detailedOrder)

  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error')
  }
})


// router.post('/', (req, res) => {
//   const newOrder = new Order({
//     _id: mongoose.Types.ObjectId(),
//     cartId: mongoose.Types.ObjectId(req.body.cartId),
//     orderdDate: Date.now(),
//   });
//   newOrder
//     .save()
//     .then((order) => {
//       axios
//         .get('http://localhost:3004/cart/' + req.body.cartId)
//         .then((currentCart) => {
//           const prodlist = [];
//           if (currentCart.data.productList.length === 0)
//             return res.json({ msg: 'Cart is empty' });
//           currentCart.data.productList.forEach((item) => {
//             currentProduct = {
//               id: item.productId,
//               quantity: +item.quantity,
//             };
//             prodlist.push(currentProduct);
//           });
//           axios
//             .post('http://localhost:3002/products/update', {
//               products: prodlist,
//             })
//             .then((result) => {
//               axios
//                 .patch('http://localhost:3004/cart/user/' + req.body.cartId)
//                 .then((res) => {
//                   res.json({
//                     result: 'Sucessfully Create a purchase',
//                   });
//                 })
//                 .catch((error) => res.json(error.message));
//             })
//             .catch((error) => res.json(error.message));
//         })
//         .catch((error) => {
//           console.log(error);
//           res.json(error.message);
//         });
//     })
//     .catch((err) => {
//       res.json({
//         error: err,
//       });
//     });
// });

router.get('/:_id', (req, res) => {
  Order.findById(req.params._id)
    .exec()
    .then((order) => {
      axios.get('http://localhost:3004/cart/' + order.cartId).then((obj) => {
        console.log(obj);
        res.json({
          order: { orderId: order._id, cart: obj.data.cart },
        });
      });
    })
    .catch((err) => {
      res.json({
        error: err,
      });
    });
});

router.delete('/cancelOrder/:orderId', (req, res) => {
  Order.findById(req.params.orderId)
    .exec()
    .then(() => {
      res.json({
        message: 'your order has been successfully deleted',
      });
    });
});

module.exports = router;

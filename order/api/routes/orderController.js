const express = require('express');
const mongoose = require('mongoose');
const orderModel = require('../model/orderModel');
const router = express.Router();
const Order = require('../model/orderModel');
const axios = require('axios');
router.post('/', (req, res) => {
  const newOrder = new Order({
    _id: mongoose.Types.ObjectId(),
    cartId: mongoose.Types.ObjectId(req.body.cartId),
    orderdDate: Date.now(),
  });
  newOrder
    .save()
    .then((order) => {
      axios
        .get('http://localhost:3004/cart/' + req.body.cartId)
        .then((currentCart) => {
          const prodlist = [];
          if (currentCart.data.productList.length === 0)
            return res.json({ msg: 'Cart is empty' });
          currentCart.data.productList.forEach((item) => {
            currentProduct = {
              id: item.productId,
              quantity: +item.quantity,
            };
            prodlist.push(currentProduct);
          });
          axios
            .post('http://localhost:3002/products/update', {
              products: prodlist,
            })
            .then((result) => {
              axios
                .patch('http://localhost:3004/cart/user/' + req.body.cartId)
                .then((res) => {
                  res.json({
                    result: 'Sucessfully Create a purchase',
                  });
                })
                .catch((error) => res.json(error.message));
            })
            .catch((error) => res.json(error.message));
        })
        .catch((error) => {
          console.log(error);
          res.json(error.message);
        });
    })
    .catch((err) => {
      res.json({
        error: err,
      });
    });
});

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

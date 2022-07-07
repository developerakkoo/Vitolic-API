const express = require('express');
const orderController = require('../Controllers/orderController');


const router = express.Router();

router.get('/cart/clear/:userId', orderController.clearCart);


router.post('/cart', orderController.AddToCart);
router.post('/cart/remove', orderController.removeFromCart);
router.post('/order', orderController.createOrder);




module.exports = router;
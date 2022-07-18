const express = require('express');

const cartController = require('../Controllers/cartController');

const router = express.Router();

router.post('/cart', cartController.addToCart);

router.get('/cart/single/:id', cartController.getCart);
router.get('/cart/:user', cartController.getCartByUser);


module.exports = router;
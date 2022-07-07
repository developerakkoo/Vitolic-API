const express = require('express');

const cartController = require('../Controllers/cartController');

const router = express.Router();

router.post('/', cartController.addToCart);

router.get('/user/cart', cartController.getCart);


module.exports = router;
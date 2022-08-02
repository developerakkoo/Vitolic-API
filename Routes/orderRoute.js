const express = require('express');
const orderController = require('../Controllers/orderController');
const router = express.Router();
const apicache = require('apicache');
const cache = apicache.middleware;


router.post('/order', cache('7 days'), orderController.createOrder);




module.exports = router;
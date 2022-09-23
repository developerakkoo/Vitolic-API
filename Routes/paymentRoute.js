const express = require('express');
const paymentController = require('../Controllers/paymentController');
const router = express.Router();



router.post('/order',  paymentController.createOrder);




module.exports = router;
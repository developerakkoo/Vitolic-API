const QuantityController = require('../Controllers/quantityController');
const express = require('express');

const router = express.Router();

router.post('/quantity', QuantityController.PostQuantity);


module.exports = router;
const express = require('express');
const subOrderController = require('./../Controllers/subOrderController');
const router = express.Router();

router.get('/suborder',subOrderController.getSubOrders);
router.get('/suborder/:mainOrderId/:today/:pincode', subOrderController.getTodaysOrders);


module.exports = router;
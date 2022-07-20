const express = require('express');
const refundController = require('../Controllers/refundController');
const router = express.Router();

router.get('/refund/:userId', refundController.getRefundByUserId);
router.post('/refund', refundController.postRefund);
router.put('/refund/:userId', refundController.updateRefund);
router.delete('/refund/:userId', refundController.deleteRefund);

module.exports = router;
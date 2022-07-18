const express = require('express');
const router = express.Router();

const coupon = require('../Controllers/couponController');
router.post('/coupon', coupon.createCoupon);

router.get('/banner', coupon.getCoupons);
router.get('/banner/:id', coupon.getCouponById);

router.delete('/banner/:id', coupon.deleteCoupon);


module.exports = router;
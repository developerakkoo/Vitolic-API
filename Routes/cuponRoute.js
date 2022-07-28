const express = require('express');
const router = express.Router();
const coupon = require('../Controllers/couponController');
const apicache = require('apicache');
const cache = apicache.middleware;

/**
 * @swagger
 * /coupon:
 *  post:
 *      description: Add coupons
 *      tags:
 *          - coupon
 * 
 *      parameters:
 *          - name: code
 *            description: code of the coupon
 *            in: formData
 *            required: true
 *            type: String
 *          - name: discount
 *            description: discount value of the coupon
 *            in: formData
 *            required: true
 *            type: Number
 *          - name: description
 *            description: description of the coupon
 *            in: formData
 *            required: true
 *            type: String
 *
 *      responses:
 *         200:
 *              description: Success
 *  
 *  
 * 
 */
router.post('/coupon', cache('7days'), coupon.createCoupon);
/**
 * @swagger
 * /banner:
 *  get:
 *      description: get all coupons
 *      tags:
 *          - coupon
 * 
 *
 *      responses:
 *         200:
 *              description: Success
 *  
 *  
 * 
 */
router.get('/banner', cache('7days'), coupon.getCoupons);
/**
 * @swagger
 * /banner/{id}:
 *  get:
 *      description: get coupon using id
 *      tags:
 *          - coupon
 * 
 *
 *      responses:
 *         200:
 *              description: Success
 *  
 *  
 * 
 */
router.get('/banner/:id', cache('7days'), coupon.getCouponById);
/**
 * @swagger
 * /banner/{id}:
 *  delete:
 *      description: delete coupon using id
 *      tags:
 *          - coupon
 * 
 *
 *      responses:
 *         200:
 *              description: Success
 *  
 *  
 * 
 */
router.delete('/banner/:id', cache('7days'), coupon.deleteCoupon);


module.exports = router;
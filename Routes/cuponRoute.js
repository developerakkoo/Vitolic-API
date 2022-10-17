const express = require('express');
const router = express.Router();
const coupon = require('../Controllers/couponController');


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
router.post('/coupon',  coupon.createCoupon);
/**
 * @swagger
 * /coupon:
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
router.get('/coupon',  coupon.getCoupons);
/**
 * @swagger
 * /coupon/{id}:
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
router.get('/coupon/:id',  coupon.getCouponById);

/**
 * @swagger
 * /coupon/{id}:
 *  put:
 *      description: update coupon using id
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
 router.put('/coupon/:id',  coupon.updateCoupon);

/**
 * @swagger
 * /coupon/{id}:
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
router.delete('/coupon/:id',  coupon.deleteCoupon);


module.exports = router;
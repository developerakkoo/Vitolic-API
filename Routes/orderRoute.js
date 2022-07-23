const express = require('express');
const orderController = require('../Controllers/orderController');


const router = express.Router();




/**
 * @swagger
 * /order:
 *  post:
 *      description: Add order
 *      tags:
 *          - order
 * 
 *      parameters:
 *          - name: products
 *            description: products to order
 *            in: formData
 *            required: true
 *            type: String
 *          - name: products
 *            description: products to order
 *            in: formData
 *            required: true
 *            type: String
 *          - name: products
 *            description: products to order
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
router.post('/order', orderController.createOrder);




module.exports = router;
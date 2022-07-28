const express = require('express');
const orderController = require('../Controllers/orderController');
const router = express.Router();
const apicache = require('apicache');
const cache = apicache.middleware;


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
 *  
 *          - name: product
 *            description: products to order
 *            in: formData
 *            required: true
 *            type: String 
 *          - name: quantity
 *            description: quantity to order
 *            in: formData
 *            required: true
 *            type: Number ]    
 *       
 *           
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
router.post('/order', cache('7 days'), orderController.createOrder);




module.exports = router;
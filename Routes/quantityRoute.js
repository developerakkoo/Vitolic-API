const QuantityController = require('../Controllers/quantityController');
const express = require('express');
const router = express.Router();


/**
 * @swagger
 * /quantity:
 *  post:
 *      description: Add quantity
 *      tags:
 *          - quantity
 * 
 *      parameters:
 *          - name: units
 *            description: units of the product
 *            in: formData
 *            required: true
 *            type: String
 *          - name: price
 *            description: price of the product
 *            in: formData
 *            required: true
 *            type: String
 *          - name: discountedPrice
 *            description: Discount price of the product
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
router.post('/quantity',  QuantityController.PostQuantity);


module.exports = router;
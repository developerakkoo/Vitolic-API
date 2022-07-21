const express = require('express');

const subscriptionController = require('../Controllers/subscriptionController');
const router = express.Router();



/**
 * @swagger
 * /products:
 *  post:
 *      description: Create a new subscription
 *      tags:
 *          - Product
 *      parameters:
 *          - name: invoice number
 *            description: invoice number
 *            in: formData
 *            required: true
 *            type: String
 *          - name: milk
 *            description: type of milk
 *            in: formData
 *            required: true
 *            type: Number
 *          - name: customer name
 *            description: Name of the customer
 *            in: formData
 *            required: true
 *            type: Number
 *          - name: phone
 *            description: true/false
 *            in: formData
 *            required: true
 *            type: Number
 *          - name: email Id 
 *            description: email id of customer
 *            in: formData
 *            required: true
 *            type: String
 *          - name: address
 *            description: address of the customer
 *            in: formData
 *            required: true
 *            type: Number
 *          - name: deliveryFrequency
 *            description: Frequency of delivery
 *            in: formData
 *            required: true
 *            type: String
 *          - name: deliveryPerson
 *            description: Delivery person assigned
 *            in: formData
 *            required: true
 *            type: String
 *      responses:
 *         200:
 *              description: Success
 *  
 *  
 * 
 */
router.post('/subscription', subscriptionController.postSubscription);

/**
 * @swagger
 * /products:
 *  get:
 *      description: Create a new subscription
 *      tags:
 *          - Product
 *      parameters:
 *          - name: invoice number
 *            description: invoice number
 *            in: formData
 *            required: true
 *            type: String
 *          - name: milk
 *            description: type of milk
 *            in: formData
 *            required: true
 *            type: Number
 *          - name: customer name
 *            description: Name of the customer
 *            in: formData
 *            required: true
 *            type: Number
 *          - name: phone
 *            description: true/false
 *            in: formData
 *            required: true
 *            type: Number
 *          - name: email Id 
 *            description: email id of customer
 *            in: formData
 *            required: true
 *            type: String
 *          - name: address
 *            description: address of the customer
 *            in: formData
 *            required: true
 *            type: Number
 *          - name: deliveryFrequency
 *            description: Frequency of delivery
 *            in: formData
 *            required: true
 *            type: String
 *          - name: deliveryPerson
 *            description: Delivery person assigned
 *            in: formData
 *            required: true
 *            type: String
 *      responses:
 *         200:
 *              description: Success
 *  
 *  
 * 
 */
router.get('/subscription', subscriptionController.getSubscription);

/**
 * @swagger
 * /products:
 *  put:
 *      description: Create a new subscription
 *      tags:
 *          - Product
 *      parameters:
 *          - name: invoice number
 *            description: invoice number
 *            in: formData
 *            required: true
 *            type: String
 *          - name: milk
 *            description: type of milk
 *            in: formData
 *            required: true
 *            type: Number
 *          - name: customer name
 *            description: Name of the customer
 *            in: formData
 *            required: true
 *            type: Number
 *          - name: phone
 *            description: true/false
 *            in: formData
 *            required: true
 *            type: Number
 *          - name: email Id 
 *            description: email id of customer
 *            in: formData
 *            required: true
 *            type: String
 *          - name: address
 *            description: address of the customer
 *            in: formData
 *            required: true
 *            type: Number
 *          - name: deliveryFrequency
 *            description: Frequency of delivery
 *            in: formData
 *            required: true
 *            type: String
 *          - name: deliveryPerson
 *            description: Delivery person assigned
 *            in: formData
 *            required: true
 *            type: String
 *      responses:
 *         200:
 *              description: Success
 *  
 *  
 * 
 */
router.put('/subscription/:invoicenumber', subscriptionController.updateSubscription);

/**
 * @swagger
 * /products:
 *  delete:
 *      description: Create a new subscription
 *      tags:
 *          - Product
 *      parameters:
 *          - name: invoice number
 *            description: invoice number
 *            in: formData
 *            required: true
 *            type: String
 *          - name: milk
 *            description: type of milk
 *            in: formData
 *            required: true
 *            type: Number
 *          - name: customer name
 *            description: Name of the customer
 *            in: formData
 *            required: true
 *            type: Number
 *          - name: phone
 *            description: true/false
 *            in: formData
 *            required: true
 *            type: Number
 *          - name: email Id 
 *            description: email id of customer
 *            in: formData
 *            required: true
 *            type: String
 *          - name: address
 *            description: address of the customer
 *            in: formData
 *            required: true
 *            type: Number
 *          - name: deliveryFrequency
 *            description: Frequency of delivery
 *            in: formData
 *            required: true
 *            type: String
 *          - name: deliveryPerson
 *            description: Delivery person assigned
 *            in: formData
 *            required: true
 *            type: String
 *      responses:
 *         200:
 *              description: Success
 *  
 *  
 * 
 */
router.delete('/subscription/:invoicenumber', subscriptionController.deleteSubscription);


module.exports = router;
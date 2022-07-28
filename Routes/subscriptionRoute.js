const express = require('express');
const subscriptionController = require('../Controllers/subscriptionController');
const router = express.Router();
const apicache = require('apicache');
const cache = apicache.middleware;


/**
 * @swagger
 * /subscription:
 *  post:
 *      description: Create a new subscription
 *      tags:
 *          - subscription
 *      parameters:
 *          - name: invoiceNumber
 *            description: invoice number
 *            in: formData
 *            required: true
 *            type: String
 *          - name: milk
 *            description: type of milk
 *            in: formData
 *            required: true
 *            type: String
 *          - name: customerName
 *            description: Name of the customer
 *            in: formData
 *            required: true
 *            type: String
 *          - name: phone
 *            description: phone number of the customer
 *            in: formData
 *            required: true
 *            type: Number
 *          - name: emailId 
 *            description: email id of customer
 *            in: formData
 *            required: true
 *            type: String
 *          - name: address
 *            description: address of the customer
 *            in: formData
 *            required: true
 *            type: String
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
router.post('/subscription', cache('7 days'), subscriptionController.postSubscription);

/**
 * @swagger
 * /subscription:
 *  get:
 *      description: get all subscriptions
 *      tags:
 *          - subscription
 * 
 *      responses:
 *         200:
 *              description: Success
 *  
 *  
 * 
 */
router.get('/subscription', cache('7 days'), subscriptionController.getSubscription);

/**
 * @swagger
 * /subscription/{invoicenumber}:
 *  put:
 *      description: update subscription using invoice number
 *      tags:
 *          - subscription
 * 
 *      responses:
 *         200:
 *              description: Success
 *  
 *  
 * 
 */
router.put('/subscription/:invoicenumber', cache('7 days'), subscriptionController.updateSubscription);

/**
 * @swagger
 * /subscription/{invoicenumber}:
 *  delete:
 *      description: delete subscription using invoice number
 *      tags:
 *          - subscription
 * 
 *      responses:
 *         200:
 *              description: Success
 *  
 *  
 * 
 */
router.delete('/subscription/:invoicenumber', cache('7 days'), subscriptionController.deleteSubscription);


module.exports = router;
const express = require('express');
const subscriptionController = require('../Controllers/subscriptionController');
const router = express.Router();



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
router.post('/subscription',  subscriptionController.postSubscription);
 
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
router.get('/subscription',  subscriptionController.getSubscription);

/**
 * @swagger
 * /subscription/{id}:
 *  get:
 *      description: get subscription by subscription id
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
 router.get('/subscription/:id',  subscriptionController.getSubscriptionById);


/**
 * @swagger
 * /subscription/user/{userid}:
 *  get:
 *      description: get  subscription by userId
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
 router.get('/subscription/user/:id',  subscriptionController.getSubscriptionByUserId);
 

/**
 * @swagger
 * /subscription/{id}:
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
router.put('/subscription/:id',  subscriptionController.updateSubscription);

router.put('/subscription/pause/:id',  subscriptionController.pause);
router.put('/subscription/vacation/:id',  subscriptionController.vacation);
router.put('/subscription/terminate/:id',  subscriptionController.terminate);
router.put('/subscription/upgradealt/:id',  subscriptionController.upgradeAlt);
router.put('/subscription/upgradecustom/:id',  subscriptionController.upgradeCustom);



/**
 * @swagger
 * /subscription/{id}:
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
router.delete('/subscription/:id',  subscriptionController.deleteSubscription);


module.exports = router;
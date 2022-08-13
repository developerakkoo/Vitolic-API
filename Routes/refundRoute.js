const express = require('express');
const refundController = require('../Controllers/refundController');
const router = express.Router();


/**
 * @swagger
 * /refund/{userId}:
 *  get:
 *      description: get refund by userid 
 *      tags:
 *          - refund
 * 
 *      responses:
 *         200:
 *              description: Success
 *  
 *  
 * 
 */
router.get('/refund/:userId',  refundController.getRefundByUserId);

/**
 * @swagger
 * /refund:
 *  post:
 *      description: Add refund
 *      tags:
 *          - refund
 * 
 *      parameters:
 *          - name: userId
 *            description: Id of the  user
 *            in: formData
 *            required: true
 *            type: String
 *          - name: orderId
 *            description: Order Id of the order
 *            in: formData
 *            required: true
 *            type: String
 *          - name: description
 *            description: reason for the refund
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
router.post('/refund',  refundController.postRefund);

/**
 * @swagger
 * /refunds:
 *  get:
 *      description: get all refunds  
 *      tags:
 *          - refund
 * 
 *      responses:
 *         200:
 *              description: Success
 *  
 *  
 * 
 */
router.get('/refunds',  refundController.getRefund);


/**
 * @swagger
 * /refund/{userId}:
 *  put:
 *      description: upadte refund by userid 
 *      tags:
 *          - refund
 * 
 *      responses:
 *         200:
 *              description: Success
 *  
 *  
 * 
 */
router.put('/refund/:userId',  refundController.updateRefund);

/**
 * @swagger
 * /refund/{userId}:
 *  delete:
 *      description: delete refund by userid 
 *      tags:
 *          - refund
 * 
 *      responses:
 *         200:
 *              description: Success
 *  
 *  
 * 
 */
router.delete('/refund/:userId',  refundController.deleteRefund);

module.exports = router;
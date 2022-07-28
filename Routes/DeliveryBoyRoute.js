const express = require('express');
const router = express.Router();
const boyController = require('../Controllers/DeliveryBoyController');
const apicache = require('apicache');
const cache = apicache.middleware;

/**
 * @swagger
 * /boy/login:
 *  post:
 *      description: delivery boy login
 *      tags:
 *          - deliveryboy
 * 
 *      parameters:
 *          - name: email
 *            description: email of the deliveryboy
 *            in: formData
 *            required: true
 *            type: String
 *          - name: password
 *            description: password of the deliveryboy
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
router.post('/boy/login', cache('7 days'), boyController.loginUser);
/**
 * @swagger
 * /boy/register:
 *  post:
 *      description: delivery boy registration
 *      tags:
 *          - deliveryboy
 * 
 *      parameters:
 *          - name: fullName
 *            description: Full name of the deliveryboy
 *            in: formData
 *            required: true
 *            type: String
 *          - name: email
 *            description: email of the deliveryboy
 *            in: formData
 *            required: true
 *            type: String
 *          - name: password
 *            description: password of the deliveryboy
 *            in: formData
 *            required: true
 *            type: String
 *          - name: contactNumber
 *            description: contactNumber of the deliveryboy
 *            in: formData
 *            required: true
 *            type: String
 *          - name: cordinates
 *            description: cordinates of the deliveryboy
 *            in: formData
 *            required: true
 *            type: String
 *          - name: resetPasswordToken
 *            description: resetPasswordToken of the deliveryboy
 *            in: formData
 *            type: String
 *          - name: expiredPasswordToken
 *            description: expiredPasswordToken of the deliveryboy
 *            in: formData
 *            type: String 
 *
 *      responses:
 *         200:
 *              description: Success
 *  
 *  
 * 
 */
router.post('/boy/register', cache('7 days'), boyController.postSignup);
/**
 * @swagger
 * /boy/{id}:
 *  put:
 *      description: update delivery boy using id
 *      tags:
 *          - deliveryboy
 * 
 *      responses:
 *         200:
 *              description: Success
 *  
 *  
 * 
 */
router.put('/boy/:id', cache('7 days'), boyController.updateBoyById);
/**
 * @swagger
 * /boy/{id}:
 *  get:
 *      description: get delivery boy using id
 *      tags:
 *          - deliveryboy
 * 
 *      responses:
 *         200:
 *              description: Success
 *  
 *  
 * 
 */
router.get('/boy/:id', cache('7 days'), boyController.getBoyById);
/**
 * @swagger
 * /boy:
 *  get:
 *      description: get all delivery boys
 *      tags:
 *          - deliveryboy
 * 
 *      responses:
 *         200:
 *              description: Success
 *  
 *  
 * 
 */
router.get('/boy', cache('7 days'), boyController.getBoys);
/**
 * @swagger
 * /boy/assign/{id}/{orderId}/{slotId}:
 *  get:
 *      description: get delivery boy using id, orderId and slotId
 *      tags:
 *          - deliveryboy
 * 
 *      responses:
 *         200:
 *              description: Success
 *  
 *  
 * 
 */
router.get('/boy/assign/:id/:orderId/:slotId', cache('7 days'), boyController.getBoyAndAssignOrder);

/**
 * @swagger
 * /boy/{id}:
 *  delete:
 *      description: delete delivery boy using id
 *      tags:
 *          - deliveryboy
 * 
 *      responses:
 *         200:
 *              description: Success
 *  
 *  
 * 
 */
router.delete('/boy/:id', cache('7 days'), boyController.deleteBoyById);









module.exports = router;

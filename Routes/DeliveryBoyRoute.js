const express = require('express');
const router = express.Router();
const boyController = require('../Controllers/DeliveryBoyController');


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
router.post('/boy/login',  boyController.loginUser);
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
router.post('/boy/register',  boyController.postSignup);
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
router.put('/boy/:id',  boyController.updateBoyById);
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
router.get('/boy/:id',  boyController.getBoyById);
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
router.get('/boy',  boyController.getBoys);
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
router.get('/boy/assign/:id/:orderId/:slotId',  boyController.getBoyAndAssignOrder);

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
router.delete('/boy/:id',  boyController.deleteBoyById);









module.exports = router;

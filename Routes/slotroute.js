const express = require('express');
const slotController = require('../Controllers/slotController');
const router = express.Router();
const apicache = require('apicache');
const cache = apicache.middleware;


/**
 * @swagger
 * /slot:
 *  post:
 *      description: Add slot
 *      tags:
 *          - slot
 * 
 *      parameters:
 *          - name: startTime
 *            description: Start time of the slot
 *            in: formData
 *            required: true
 *            type: Date
 *          - name: endTime
 *            description: end time of the slot
 *            in: formData
 *            required: true
 *            type: Date
 *          - name: todaysDate
 *            description: Todays date in the slot
 *            in: formData
 *            required: true
 *            type: Date
 *          - name: slotAvailable
 *            description: Availability of the slot
 *            in: formData
 *            required: true
 *            type: Number
 *          - name: orders
 *            description: orders in that time of the slot
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
router.post('/slot', cache('7 days'), slotController.postSlot);

/**
 * @swagger
 * /slot:
 *  get:
 *      description: get all slots 
 *      tags:
 *          - slot
 * 
 *     
 *
 *      responses:
 *         200:
 *              description: Success
 *  
 *  
 * 
 */
router.get('/slot', cache('7 days'), slotController.getSlot);

/**
 * @swagger
 * /slot/date/{date}:
 *  get:
 *      description: get all slots by date
 *      tags:
 *          - slot
 * 
 *     
 *
 *      responses:
 *         200:
 *              description: Success
 *  
 *  
 * 
 */
router.get('/slot/date/:date', cache('7 days'), slotController.getSlotByDate);

/**
 * @swagger
 * /slot/{id}:
 *  get:
 *      description: get slot by id
 *      tags:
 *          - slot
 * 
 *     
 *
 *      responses:
 *         200:
 *              description: Success
 *  
 *  
 * 
 */
router.get('/slot/:id', cache('7 days'), slotController.getSlotById);

/**
 * @swagger
 * /slot/assign/{id/{orderId}}:
 *  get:
 *      description: get slot by id and orderId
 *      tags:
 *          - slot
 * 
 *     
 *
 *      responses:
 *         200:
 *              description: Success
 *  
 *  
 * 
 */
router.get('/slot/assign/:id/:orderId', cache('7 days'), slotController.assignSlot);

/**
 * @swagger
 * /slot/{id}:
 *  put:
 *      description: update slot using id 
 *      tags:
 *          - slot
 * 
 *     
 *
 *      responses:
 *         200:
 *              description: Success
 *  
 *  
 * 
 */
router.put('/slot/:id', cache('7 days'), slotController.putSlot);

/**
 * @swagger
 * /slot/{id}:
 *  delete:
 *      description: delete slot using id 
 *      tags:
 *          - slot
 * 
 *     
 *
 *      responses:
 *         200:
 *              description: Success
 *  
 *  
 * 
 */
router.delete('/slot/:id', cache('7 days'), slotController.deleteSlot);




module.exports = router;
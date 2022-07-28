const express = require('express');
const placedOrderController = require('../Controllers/placedOrderController');
const router = express.Router();
const apicache = require('apicache');
const cache = apicache.middleware;

/**
 * @swagger
 * /place/{id}:
 *  get:
 *      description: get order by user 
 *      tags:
 *          - placeorder
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
router.get('/place/:userId', cache('7 days'), placedOrderController.getOrderByUser);


/**
 * @swagger
 * /place/order/{orderId}:
 *  get:
 *      description: get order by orderid
 *      tags:
 *          - placeorder
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
router.get('/place/order/:orderId', cache('7 days'), placedOrderController.getOrder);

/**
 * @swagger
 * /place:
 *  get:
 *      description: get all orders
 *      tags:
 *          - placeorder
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
router.get('/place', cache('7 days'), placedOrderController.getAllOrders);

/**
 * @swagger
 * /place/date/{date}:
 *  get:
 *      description: get orders by date
 *      tags:
 *          - placeorder
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
router.get('/place/date/:date', cache('7 days'), placedOrderController.getOrderByDate);

/**
 * @swagger
 * /createorder:
 *  post:
 *      description: create order
 *      tags:
 *          - placeorder
 * 
 *      parameters:
 *          - name: imageUrl
 *            description: Url of the image for place
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
router.post('/createorder', cache('7 days'), placedOrderController.createOrder);
router.post('/verifyorder', cache('7 days'), placedOrderController.verifyOrderSignature);


/**
 * @swagger
 * /place:
 *  post:
 *      description: Place order
 *      tags:
 *          - placeorder
 * 
 *      parameters:
 *          - name: orderId
 *            description: id of the order
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
 */router.post('/place', cache('7 days'), placedOrderController.placeOrder);

/**
 * @swagger
 * /place/{id}:
 *  put:
 *      description: update order using id
 *      tags:
 *          - placeorder
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
router.put('/place/:id', cache('7 days'), placedOrderController.updatePlacedOrder);

/**
 * @swagger
 * /place/{id}:
 *  delete:
 *      description: delete order using id
 *      tags:
 *          - placeorder
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
router.delete('/place/:id', cache('7 days'), placedOrderController.deletePlacedOrder);




module.exports = router;
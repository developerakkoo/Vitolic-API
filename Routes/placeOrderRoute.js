const express = require('express');
const placedOrderController = require('../Controllers/placedOrderController');
const router = express.Router();


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
router.get('/place/:userId', placedOrderController.getOrderByUser);


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
router.get('/place/order/:orderId', placedOrderController.getOrder);

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
router.get('/place', placedOrderController.getAllOrders);

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
router.get('/place/date/:date', placedOrderController.getOrderByDate);

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
router.post('/createorder', placedOrderController.createOrder);
router.post('/verifyorder', placedOrderController.verifyOrderSignature);


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
 */router.post('/place', placedOrderController.placeOrder);

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
router.put('/place/:id', placedOrderController.updatePlacedOrder);

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
router.delete('/place/:id', placedOrderController.deletePlacedOrder);




module.exports = router;
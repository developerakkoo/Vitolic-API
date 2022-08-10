const express = require('express');

const cartController = require('../Controllers/cartController');

const router = express.Router();

/**
 * @swagger
 * /cart:
 *  post:
 *      description: Add to cart
 *      tags:
 *          - cart
 * 
 *      parameters:
 *          - name: userId
 *            description: Id of the user
 *            in: formData
 *            required: true
 *            type: String
 *          - name: address
 *            description: Address of the user
 *            in: formData
 *            required: true
 *            type: String
 *          - name: status
 *            description: status of the cart
 *            in: formData
 *            required: true
 *            type: String
 *          - name: total
 *            description: total amount in the cart
 *            in: formData
 *            required: true
 *            type: Number
 *
 *      responses:
 *         200:
 *              description: Success
 *  
 *  
 * 
 */
router.post('/cart',  cartController.addToCart);

/**
 * @swagger
 * /cart/single/{id}:
 *  get:
 *      description: get cart details by id
 *      tags:
 *          - cart
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
router.get('/cart/:id',  cartController.getCartByCartId);

router.get('/cart/user/:id',  cartController.getCartByUserId);

/**
 * @swagger
 * /cart:
 *  get:
 *      description: get cart details of all users
 *      tags:
 *          - cart
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
router.get('/cart',  cartController.getCart);

router.get('/deliver/:id', placedOrderController.orderDelivered);
module.exports = router;
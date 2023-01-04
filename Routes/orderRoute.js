const express = require('express');

const cartController = require('../Controllers/orderController');

const router = express.Router();

router.put('/cart/order/:id', cartController.addOrder);

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
router.post('/cart', cartController.addToCart);

router.post('/cart/date', cartController.getCartByDate);
router.post('/cart/type', cartController.getCartByType);

/**
 * @swagger
 * /cart/featured:
 *  get:
 *      description: get featured products
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
router.get('/cart/featured',  cartController.featured);
router.get('/cart/date',  cartController.getCartByDate);
router.get('/cart/paused', cartController.getCartPaused);
router.get('/cart/terminated', cartController.getCartTerminated);
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
router.post('/cart', cartController.addToCart);

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
router.get('/cart/:id', cartController.getCartByCartId);

router.get('/cart/user/:id', cartController.getCartByUserId);

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
router.get('/cart/filter', cartController.getCartFilter);

router.get('/cart', cartController.getCart);
/**
 * @swagger
 * /deliver/{id}:
 *  put:
 *      description: update cart details by cartid, update deliver status and quantity
 
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
router.put('/deliver/:id', cartController.orderDelivered);
router.put('/deliver/status/:id', cartController.orderStatus);



module.exports = router;
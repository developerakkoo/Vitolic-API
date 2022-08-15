const express = require('express');
const UserOrdersController = require('../Controllers/userOrdersController');
const router = express.Router();

//auth routes starrt
/**
 * @swagger
 * /user/orders/{userid}:
 *  get:
 *      description: Get all Orders of user by user id 
 *      tags:
 *          - User 
 * 
 * 
 *      responses:
 *         200:
 *              description: Success
 *  
 *  
 * 
 */
 router.get('/user/orders/:id', UserOrdersController.getCartByUserId);

 
module.exports = router;
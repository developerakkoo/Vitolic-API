const express = require('express');
const { body } = require('express-validator');
const authController = require('./../Controllers/adminController');
const verify  = require('../middleware/isAdmin')

const router = express.Router();



/**
 * @swagger
 * /login:
 *  post:
 *      description: Admin login
 *      tags:
 *          - Login
 * 
 *      parameters:
 *          - name: email
 *            description: email of the admin
 *            in: formData
 *            required: true
 *            type: String
 *          - name: password
 *            description: password of the admin
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

router.post('/login',  authController.postLogin);
/**
 * @swagger
 * /signup:
 *  post:
 *      description: Admin login
 *      tags:
 *          - Admin SignUp
 * 
 *      parameters:
 *          - name: email
 *            description: email of the admin
 *            in: formData
 *            required: true
 *            type: String
 *          - name: password
 *            description: password of the admin
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
router.post('/signup', 
    [
        body('email').isEmail().withMessage('Please enter a valid email!'),
        body('password').trim().isLength({ min: 5 })
    ],
    authController.postSignup);



    router.get('/totalUser',authController.totalUser);

    router.get('/yearlyEarnings',authController.yearlyEarnings);

    router.get('/monthlyEarning',authController.monthlyEarning);

    router.get('/totalRefunds',authController.totalRefund);

    router.get('/activeSubscriber',authController.activeSubscriber);

    router.get('/notActiveSubscriber',authController.notActiveSubscriber);

    router.get('/outOfStockProducts',authController.outOfStockProducts);

    router.get('/totalOrder',authController.totalOrder);

    router.get('/totalCompletedOrder',authController.totalCompletedOrder);

module.exports = router;
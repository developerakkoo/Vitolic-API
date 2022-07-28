const express = require('express');
const { body } = require('express-validator');
const authController = require('./../Controllers/adminController');

const router = express.Router();
const apicache = require('apicache');
const cache = apicache.middleware;


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

router.post('/login', cache('7 days'), authController.postLogin);
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
router.post('/signup', cache('7 days'),
    [
        body('email').isEmail().withMessage('Please enter a valid email!'),
        body('password').trim().isLength({ min: 5 })
    ],
    authController.postSignup);




module.exports = router;
const express = require('express');
const { body } = require('express-validator');
const authController = require('./../Controllers/subAdminController');
const router = express.Router();
const apicache = require('apicache');
const cache = apicache.middleware;

/**
 * @swagger
 * /subadminlogin:
 *  post:
 *      description: Login for subadmin
 *      tags:
 *          - subadminlogin
 * 
 *      parameters:
 *          - name: email
 *            description: email of the subadmin
 *            in: formData
 *            required: true
 *            type: String
 *          - name: password
 *            description: email of the subadmin
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
router.post('/subadminlogin', cache('7 days'), authController.postLogin);

/**
 * @swagger
 * /subadminsignup:
 *  post:
 *      description: signup for subadmin
 *      tags:
 *          - subadminlogin
 * 
 *      parameters:
 *          - name: email
 *            description: email of the subadmin
 *            in: formData
 *            required: true
 *            type: String
 *          - name: password
 *            description: email of the subadmin
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
router.post('/subadminsignup', cache('7 days'),
    [
        body('email').isEmail().withMessage('Please enter a valid email!'),
        body('password').trim().isLength({ min: 5 })
    ],
    authController.postSignup);




module.exports = router;
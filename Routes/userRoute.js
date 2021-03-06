const express = require('express');
const UserController = require('../Controllers/userController');
const router = express.Router();
const apicache = require('apicache');
const cache = apicache.middleware;
//auth routes starrt

/**
 * @swagger
 * /token:
 *  post:
 *      description: get Token of the user using phone number
 *      tags:
 *          - User 
 * 
 *      parameters:
 *          - name: phonenumber
 *            description: phone Number of the user
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
router.post('/token', cache('7 days'), UserController.getToken);

/**
 * @swagger
 * /verify:
 *  post:
 *      description: Verify Token of the user
 *      tags:
 *          - User 
 * 
 *      parameters:
 *          - name: code
 *            description: code received by the user
 *            in: formData
 *            required: true
 *            type: String
 *          - name: phonenumber
 *            description: phone Number of the user
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
router.post('/verify', cache('7 days'), UserController.verifyToken);


//auth routes end
/**
 * @swagger
 * /user/profiles:
 *  get:
 *      description: Get all user profiles
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
router.get('/user/profiles', cache('7 days'), UserController.getAllUsers);

/**
 * @swagger
 * /user/profiles/{userId}:
 *  get:
 *      description: Get user profile using userId
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
router.get('/user/profile/:userId', cache('7 days'), UserController.getUserProfile);



/**
 * @swagger
 * /user/login:
 *  post:
 *      description: Login for the user
 *      tags:
 *          - User 
 * 
 *      parameters:
 *          - name: email
 *            description: email id of  the user
 *            in: formData
 *            required: true
 *            type: String
 *          - name: password
 *            description: password of the user
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
router.post('/user/login', cache('7 days'), UserController.loginUser);

/**
 * @swagger
 * /user/register:
 *  post:
 *      description: Registeration for the user
 *      tags:
 *          - User 
 * 
 *      parameters:
 *          - name: fName
 *            description: full name of  the user
 *            in: formData
 *            required: true
 *            type: String
 *          - name: email
 *            description: email id of  the user
 *            in: formData
 *            required: true
 *            type: String
 *          - name: contactNumber
 *            description: contact number of the user
 *            in: formData
 *            required: true
 *            type: String
 *          - name: address
 *            description: adress of the user
 *            in: formData
 *            required: true
 *            type: String
 *          - name: walletCashbackAvailable
 *            description: Cashback Available in the wallet of the user
 *            in: formData
 *            required: true
 *            type: Number
 *          - name: couponCode
 *            description: couponCode for the user
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
router.post('/user/register', cache('7 days'), UserController.postSignup);


/**
 * @swagger
 * /user/profiles:
 *  post:
 *      description: Profile of the user
 *      tags:
 *          - User 
 * 
 *      parameters:
 *          - name: fName
 *            description:first name of  the user
 *            in: formData
 *            required: true
 *            type: String
 *          - name: lName
 *            description: last name of  the user
 *            in: formData
 *            required: true
 *            type: String
 *          - name: email
 *            description: email id of  the user
 *            in: formData
 *            required: true
 *            type: String
 *          - name: contactNumber
 *            description: contact number of the user
 *            in: formData
 *            required: true
 *            type: String
 *          - name: verificationStatus
 *            description: verificationStatus of the user
 *            in: formData
 *            required: true
 *            type: String
 *          - name: walletCashbackAvailable
 *            description: Cashback Available in the wallet of the user
 *            in: formData
 *            required: true
 *            type: Number
 *          - name: couponCode
 *            description: couponCode for the user
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
router.post('/user/profiles', cache('7 days'), UserController.createUser);

/**
 * @swagger
 * /user/profiles/{id}:
 *  put:
 *      description: Update user profiles by id
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
router.put('/user/profiles/:id', cache('7 days'), UserController.updateUser);

/**
 * @swagger
 * /user/profiles/{id}:
 *  delete:
 *      description: delete user profiles by id
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
router.delete('/user/profiles/:id', cache('7 days'), UserController.deleteUserProfile);

module.exports = router;
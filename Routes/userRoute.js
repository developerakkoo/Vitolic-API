const express = require('express');
const UserController = require('../Controllers/userController');
const router = express.Router();

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
router.post('/token', UserController.getToken);

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
router.post('/verify', UserController.verifyToken);


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
router.get('/user/profiles', UserController.getAllUsers);

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
router.get('/user/profile/:userId', UserController.getUserProfile);
router.get('/user/profile/getByMobileNumber/:mobile', UserController.getUserProfileByMobileNumber);

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
router.post('/user/login', UserController.loginUser);

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
router.post('/user/register', UserController.postSignup);

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
 *            description: first name of  the user
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
//router.post('/user/profiles',  UserController.createUser);

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
router.put('/user/profiles/:id', UserController.updateUser);

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
router.delete('/user/profiles/:id', UserController.deleteUserProfile);




/**
 * @swagger
 * /user/coupon/{id}:
 *  put:
 *      description: generate coupon for user by id
 *      tags:
 *          - User
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
router.put('/user/coupon/:id', UserController.updateUserCoupon);

router.put('/user/wallet/:id', UserController.updateUserWallet);


module.exports = router;
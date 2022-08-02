const express = require('express');
const UserAuthController = require('../Controllers/userAuthController');
const router = express.Router();



/**
 * @swagger
 * /user/login:
 *  post:
 *      description: Authenthicate user login
 *      tags:
 *          - Authenthication 
 * 
 *      parameters:
 *          - name: email
 *            description: email of the user
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
router.post('/user/login',  UserAuthController.loginUser);

/**
 * @swagger
 * /user/register:
 *  post:
 *      description: Authenthicate user signup
 *      tags:
 *          - Authenthication 
 * 
 *      parameters:
 *          - name: email
 *            description: email of the user
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
router.post('/user/register',  UserAuthController.postSignup);

/**
 * @swagger
 * /user:
 *  get:
 *      description: get all users 
 *      tags:
 *          - Authenthication 
 * 
 * 
 *      responses:
 *         200:
 *              description: Success
 *  
 *  
 * 
 */
router.get('/user',  UserAuthController.getAllUsers);

/**
 * @swagger
 * /user/{id}:
 *  get:
 *      description: get user by id 
 *      tags:
 *          - Authenthication 
 * 
 * 
 *      responses:
 *         200:
 *              description: Success
 *  
 *  
 * 
 */
router.get('/user/:id',  UserAuthController.getUser);


/**
 * @swagger
 * /user/{id}:
 *  put:
 *      description: update user by id 
 *      tags:
 *          - Authenthication 
 * 
 * 
 *      responses:
 *         200:
 *              description: Success
 *  
 *  
 * 
 */
router.put('/user/:id',  UserAuthController.updateUser);


/**
 * @swagger
 * /user/{id}:
 *  delete:
 *      description: delete user by id 
 *      tags:
 *          - Authenthication 
 * 
 * 
 *      responses:
 *         200:
 *              description: Success
 *  
 *  
 * 
 */
router.delete('/user/:id',  UserAuthController.deleteUser);


module.exports = router;
const express = require('express');
const dashboardController = require('../Controllers/dashboardController');
const router = express.Router();



/**
 * @swagger
 * /address/{userId}:
 *  get:
 *      description: get address using userId
 *      tags:
 *          - Address
 *      responses:
 *         200:
 *              description: Success
 *  
 *  
 * 
 */
router.get('/dashboard/users',  dashboardController.getLiveUsers);
/**
 * @swagger
 * /address:
 *  post:
 *      description: Create a new product
 *      tags:
 *          - Address
 * 
 *      parameters:
 *          - name: userId
 *            description: Id of the user
 *            in: formData
 *            required: true
 *            type: String
 *          - name: useradd
 *            description: address of the user
 *            in: formData
 *            required: true
 *            type: String
 *          - name: coordinates
 *            description: coordinates of the address
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
router.get('/dashboard/boys', dashboardController.getLiveBoys);
/**
 * @swagger
 * /address/{id}:
 *  put:
 *      description: update address using id
 *      tags:
 *          - Address
 *      responses:
 *         200:
 *              description: Success
 *  
 *  
 * 
 */
router.get('/dashboard/orders', dashboardController.getTotalOrders);
/**
 * @swagger
 * /address/{id}:
 *  delete:
 *      description: delete address using id
 *      tags:
 *          - Address
 *      responses:
 *         200:
 *              description: Success
 *  
 *  
 * 
 */
router.get('/dashboard/earning', dashboardController.getEarning);

router.get('/dashboard/sortorders', dashboardController.sortOrders);

router.get('/dashboard/sortproducts', dashboardController.sortProducts);

//router.get('/dashboard/earnings', dashboardController.earnings);

router.get('/dashboard/sortearnings', dashboardController.getEarningByMonth);
module.exports = router;
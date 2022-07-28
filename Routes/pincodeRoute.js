const express = require('express');
const router = express.Router();
const pincode = require('../Controllers/pincodeController');
const apicache = require('apicache');
const cache = apicache.middleware;

/**
 * @swagger
 * /pincode:
 *  post:
 *      description: Add pincode
 *      tags:
 *          - pincode
 * 
 *      parameters:
 *          - name: areaName
 *            description: Area name of the place
 *            in: formData
 *            required: true
 *            type: String
 *          - name: pincode
 *            description: Pincode of the place
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
router.post('/pincode', cache('7 days'), pincode.createPincode);

/**
 * @swagger
 * /pincode:
 *  get:
 *      description: get all pincodes 
 *      tags:
 *          - pincode
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
router.get('/pincode', cache('7 days'), pincode.getPincodes);
/**
 * @swagger
 * /pincode/{id}:
 *  put:
 *      description: update pincode using id 
 *      tags:
 *          - pincode
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
router.put('/pincode/:id', cache('7 days'), pincode.updatePincode);
/**
 * @swagger
 * /pincode/{id}:
 *  delete:
 *      description: delete pincode using id 
 *      tags:
 *          - pincode
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
router.delete('/pincode/:id', cache('7 days'), pincode.deletePincode);


module.exports = router;
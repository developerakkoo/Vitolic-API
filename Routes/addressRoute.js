const express = require('express');
const addressController = require('../Controllers/addressController');
const router = express.Router();

const apicache = require('apicache');

const cache = apicache.middleware;

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
router.get('/address/:userId', cache('7 days'), addressController.getAddressByUserId);
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
router.post('/address', cache('7 days'),addressController.postAddress);
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
router.put('/address/:id', cache('7 days'),addressController.updateAddress);
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
router.delete('/address/:id', cache('7 days'),addressController.deleteAddress);

module.exports = router;
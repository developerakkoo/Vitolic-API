const express = require('express');
const addressController = require('../Controllers/addressController');
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
router.get('/address/:userId',  addressController.getAddressByUserId);
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
router.post('/address', addressController.postAddress);
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
router.put('/address/:id', addressController.updateAddress);
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
router.delete('/address/:id', addressController.deleteAddress);

module.exports = router;
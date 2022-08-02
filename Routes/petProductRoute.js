const express = require('express');
const { body } = require('express-validator');
const petProductController = require('../Controllers/petProductController');


const router = express.Router();

//GET all products
/**
 * @swagger
 * /petproducts:
 *  get:
 *      description: get all petproducts 
 *      tags:
 *          - petproducts
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
router.get('/petproducts',  petProductController.getPetProduct);
/**
 * @swagger
 * /petproducts/{id}:
 *  get:
 *      description: get petproducts using id
 *      tags:
 *          - petproducts
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
router.get('/petproducts/:id',  petProductController.getPetProductById);
/**
 * @swagger
 * /filter/:query:
 *  get:
 *      description: search for petproducts 
 *      tags:
 *          - petproducts
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
router.get('/filter/:query',  petProductController.PetProductFilter);


//save a product
/**
 * @swagger
 * /petproducts:
 *  post:
 *      description: Add pet products
 *      tags:
 *          - petproducts
 * 
 *      parameters:
 *          - name: title
 *            description: title of the product
 *            in: formData
 *            required: true
 *            type: String
 *          - name: price
 *            description: Price of the product
 *            in: formData
 *            required: true
 *            type: Number
 *          - name: discountedPrice
 *            description: discount price of the product
 *            in: formData
 *            required: true
 *            type: Number
 *          - name: inStock
 *            description: true/false
 *            in: formData
 *            required: true
 *            type: String
 *          - name: mainCategory
 *            description: Main Category of the product
 *            in: formData
 *            required: true
 *            type: String
 *          - name: subCategory
 *            description: Sub Category of the product
 *            in: formData
 *            required: true
 *            type: String
 *          - name: stock
 *            description: stock of the product
 *            in: formData
 *            required: true
 *            type: Number
 *          - name: quantity
 *            description: quantity of the product
 *            in: formData
 *            required: true
 *            type: Number
 *          - name: units
 *            description: Units of the product
 *            in: formData
 *            required: true
 *            type: String
 *          - name: imageUrl
 *            description: Image of the product
 *            in: formData
 *            required: true
 *            type: String
 *      responses:
 *         200:
 *              description: Success
 *  
 *  
 * 
 */

router.post('/petproducts',  petProductController.postPetProduct);

//remove a product
/**
 * @swagger
 * /petproducts/{id}:
 *  delete:
 *      description: delete petproducts using id
 *      tags:
 *          - petproducts
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
router.delete('/petproduct/:id',  petProductController.deletePetProduct);

//update a product
/**
 * @swagger
 * /petproducts/{id}:
 *  put:
 *      description: update petproducts using id
 *      tags:
 *          - petproducts
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
router.put('/petproducts/:id',  petProductController.updatePetProduct);
/**
 * @swagger
 * /petproducts/stock/{id}:
 *  put:
 *      description: update stock of petproducts using id
 *      tags:
 *          - petproducts
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
router.put('/petproducts/stock/:id',  petProductController.updateStock);



module.exports = router;

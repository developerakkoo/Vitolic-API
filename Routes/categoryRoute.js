const express = require('express');
const { body } = require('express-validator');
const categoryController = require('../Controllers/categoryController');
const router = express.Router();
const apicache = require('apicache');
const cache = apicache.middleware;

//GET all category
/**
 * @swagger
 * /category:
 *  get:
 *      description: get all categories
 *      tags:
 *          - category
 * 
 *      responses:
 *         200:
 *              description: Success  
 * 
 */
router.get('/category', cache('7 days'), categoryController.getCategory);
/**
 * @swagger
 * /category/{id}:
 *  get:
 *      description: get  category using id
 *      tags:
 *          - category
 * 
 *      responses:
 *         200:
 *              description: Success  
 * 
 */
router.get('/category/:id', cache('7 days'), categoryController.getCategoryById);


//save a category
/**
 * @swagger
 * /category:
 *  post:
 *      description: Add categories
 *      tags:
 *          - category
 * 
 *      parameters:
 *          - name: mainCategory
 *            description: main category of the products
 *            in: formData
 *            required: true
 *            type: String
 *          - name: subCategory
 *            description: sub category of the products
 *            in: formData
 *            required: true
 *            type: String
 * 
 *
 *      responses:
 *         200:
 *              description: Success
 *  
 *  
 * 
 */
router.post('/category', cache('7 days'), categoryController.postCategory);

//remove a category
/**
 * @swagger
 * /category/{id}:
 *  delete:
 *      description: delete  category using id
 *      tags:
 *          - category
 * 
 *      responses:
 *         200:
 *              description: Success  
 * 
 */
router.delete('/category/:id', cache('7 days'), categoryController.deleteCategory);

//update a category
/**
 * @swagger
 * /category/{id}:
 *  put:
 *      description: update  category using id
 *      tags:
 *          - category
 * 
 *      responses:
 *         200:
 *              description: Success  
 * 
 */
router.put('/category/:id', cache('7 days'), categoryController.updateCategory);



module.exports = router;


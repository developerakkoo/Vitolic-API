const express = require('express');
const { body } = require('express-validator');
const categoryController = require('../Controllers/categoryController');
const router = express.Router();


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
router.get('/category',  categoryController.getCategory);
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
router.get('/category/:id',  categoryController.getCategoryById);


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
router.post('/category',  categoryController.postCategory);

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
router.delete('/category/:id',  categoryController.deleteCategory);

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
router.put('/category/:id',  categoryController.updateCategory);



module.exports = router;


const express = require('express');
const { body } = require('express-validator');
const productController = require('../Controllers/productController');
const router = express.Router();


/**
 * @swagger
 * /products:
 *  post:
 *      description: Create a new product
 *      tags:
 *          - Product
 *      parameters:
 *          - name: title
 *            description: Name of the product
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
 *          - name: category
 *            description: Category of the product
 *            in: formData
 *            required: true
 *            type: String
 *          - name: stock
 *            description: stock of the product
 *            in: formData
 *            required: true
 *            type: Number
 *          - name: units
 *            description: Units of the product
 *            in: formData
 *            required: true
 *            type: String
 *          - name: imageUrl
 *            description: Image file of the product, multer key(file)
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
router.post('/products',  productController.postAddProduct);

/**
 * @swagger
 * /products:
 *  get:
 *      description: get all products
 *      tags:
 *          - Product
 *      responses:
 *         200:
 *              description: Success
 *  
 *  
 * 
 */
router.get('/products',  productController.getProducts);
/**
 * @swagger
 * /products/:id:
 *  get:
 *      description: get product by Id
 *      tags:
 *          - Product
 *      parameters:
 *          - name: ID of the product
 *      responses:
 *         200:
 *              description: Success
 *  
 *  
 * 
 */
router.get('/products/:productId',  productController.getSingleProduct);

/**
 * @swagger
 * /search/:query:
 *  get:
 *      description: search for products 
 *      tags:
 *          - Product
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
router.get('/search/:query',  productController.searchProduct);


//save a product
/**
 * @swagger
 * /products/quantity/{productId}:
 *  post:
 *      description: Add product quantity by Id
 *      tags:
 *          - Product
 *      parameters:
 *          - name: quantity
 *            description: quantity of the product
 *            in: formData
 *            required: true
 *            type: Number
 *      responses:
 *         200:
 *              description: Success
 *  
 *  
 * 
 */
router.post('/products/quantity/:productId',  productController.addProductQuantity);

/**
 * @swagger
 * /products/:id:
 *  delete:
 *      description: Delete product by Id
 *      tags:
 *          - Product
 *      parameters:
 *          - name: ID of the product
 *      responses:
 *         200:
 *              description: Success
 *  
 *  
 * 
 */
router.delete('/product/:productId',  productController.postDeleteProduct);



/**
 * @swagger
 * /products/:id:
 *  put:
 *      description: Update product by Id
 *      tags:
 *          - Product
 *      parameters:
 *          - name: ID of the product to update
 *      responses:
 *         200:
 *              description: Success
 *  
 *  
 * 
 */
router.put('/products/:productId',  productController.postEditProduct);

/**
 * @swagger
 * /products/price/{productId}:
 *  put:
 *      description: Update product price by Id
 *      tags:
 *          - Product
 *      parameters:
 *          - name: price
 *            description: price of the product
 *            in: formData
 *            required: true
 *            type: Number
 *      responses:
 *         200:
 *              description: Success
 *  
 *  
 * 
 */
router.put('/products/price/:productId',  productController.productPriceChange);


module.exports = router;

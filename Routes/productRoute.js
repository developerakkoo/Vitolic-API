const express = require('express');
const {body} = require('express-validator');


const productController = require('../Controllers/productController');


const router = express.Router();

//GET all products
router.get('/products', productController.getProducts);
router.get('/products/:productId', productController.getSingleProduct);

router.get('/search/:query', productController.searchProduct);


//save a product
router.post('/products', productController.postAddProduct);
router.post('/products/quantity/:productId', productController.addProductQuantity);

//remove a product
router.delete('/product/:productId', productController.postDeleteProduct);



//update a product
router.put('/products/:productId',productController.postEditProduct);
router.put('/products/price/:productId',productController.productPriceChange);


module.exports = router;

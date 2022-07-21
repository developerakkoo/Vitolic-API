const express = require('express');
const { body } = require('express-validator');


const petProductController = require('../Controllers/petProductController');


const router = express.Router();

//GET all products
router.get('/products', petProductController.getPetProduct);
router.get('/products/:productId', petProductController.getPetProductById);

router.get('/filter/:query', petProductController.PetProductFilter);


//save a product
router.post('/products', petProductController.postPetProduct);

//remove a product
router.delete('/product/:productId', petProductController.deletePetProduct);

//update a product
router.put('/products/:productId', petProductController.updatePetProduct);
router.put('/products/stock', petProductController.updateStock);



module.exports = router;

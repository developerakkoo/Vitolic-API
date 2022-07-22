const express = require('express');
const { body } = require('express-validator');


const petProductController = require('../Controllers/petProductController');


const router = express.Router();

//GET all products
router.get('/petproducts', petProductController.getPetProduct);
router.get('/petproducts/:id', petProductController.getPetProductById);

router.get('/filter/:query', petProductController.PetProductFilter);


//save a product
router.post('/petproducts', petProductController.postPetProduct);

//remove a product
router.delete('/petproduct/:id', petProductController.deletePetProduct);

//update a product
router.put('/petproducts/:id', petProductController.updatePetProduct);
router.put('/petproducts/stock/:id', petProductController.updateStock);



module.exports = router;

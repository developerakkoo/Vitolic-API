const express = require('express');
const { body } = require('express-validator');


const categoryController = require('../Controllers/categoryController');


const router = express.Router();

//GET all category
router.get('/category', categoryController.getCategory);
router.get('/category/:id', categoryController.getCategoryById);


//save a category
router.post('/category', categoryController.postCategory);

//remove a category
router.delete('/category/:id', categoryController.deleteCategory);

//update a category
router.put('/category/:id', categoryController.updateCategory);



module.exports = router;


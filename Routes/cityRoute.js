const express = require('express');
const router = express.Router();
const city = require('../Controllers/cityController');


/**
 * @swagger
 * /city:
 *  post:
 *      description: Add city
 *      tags:
 *          - city
 * 
 *      parameters:
 *          - name: city
 *            description: name of the city
 *            in: formData
 *            required: true
 *            type: String
 *
 *      responses:
 *         200:
 *              description: Success
 *  
 *  
 * 
 */
router.post('/city',  city.createCity);
/**
 * @swagger
 * /city:
 *  get:
 *      description: get all city
 *      tags:
 *          - city
 * 
 *
 *      responses:
 *         200:
 *              description: Success
 *  
 *  
 * 
 */
router.get('/city',  city.getCity);
/**
 * @swagger
 * /city/{id}:
 *  get:
 *      description: get city using id
 *      tags:
 *          - city
 * 
 *
 *      responses:
 *         200:
 *              description: Success
 *  
 *  
 * 
 */
router.get('/city/:id',  city.getCityById);

/**
 * @swagger
 * /city/{id}:
 *  put:
 *      description: update city using id
 *      tags:
 *          - city
 * 
 *
 *      responses:
 *         200:
 *              description: Success
 *  
 *  
 * 
 */
 router.put('/city/:id',  city.updateCity);

/**
 * @swagger
 * /city/{id}:
 *  delete:
 *      description: delete City using id
 *      tags:
 *          - City
 * 
 *
 *      responses:
 *         200:
 *              description: Success
 *  
 *  
 * 
 */
router.delete('/city/:id',  city.deleteCity);


module.exports = router;
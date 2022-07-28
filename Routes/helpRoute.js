const express = require('express');
const router = express.Router();
const help = require('./../Controllers/helpController');
const apicache = require('apicache');
const cache = apicache.middleware;

/**
 * @swagger
 * /help:
 *  get:
 *      description: get all help 
 *      tags:
 *          - help
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
router.get('/help', help.getHelp);
/**
 * @swagger
 * /help/{id}:
 *  get:
 *      description: get  help using id 
 *      tags:
 *          - help
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
router.get('/help/:id', cache('7 days'), help.getHelpByUserId);
/**
 * @swagger
 * /help:
 *  post:
 *      description: add help
 *      tags:
 *          - help
 * 
 *      parameters:
 *          - name: userId
 *            description: Id of the user
 *            in: formData
 *            required: true
 *            type: String
 *          - name: orderId
 *            description: Order Id of the product
 *            in: formData
 *            required: true
 *            type: String
 *          - name: description
 *            description: description of help
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
router.post('/help', cache('7 days'), help.createHelp);
/**
 * @swagger
 * /help/{id}:
 *  delete:
 *      description: delete help using id
 *      tags:
 *          - help
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
router.delete('/help/:id', cache('7 days'), help.deleteHelp);



module.exports = router;
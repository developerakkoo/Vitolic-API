const express = require('express');
const billingController = require('../Controllers/billingController');
const router = express.Router();


//GET all billing
/**
 * @swagger
 * /billing:
 *  get:
 *      description: get all billing
 *      tags:
 *          - billing
 * 
 *      responses:
 *         200:
 *              description: Success  
 * 
 */
router.get('/bill',  billingController.getBill);

router.get('/bill/date',  billingController.getBillByDate);

router.get('/bill/week',  billingController.getBillByWeek);

router.get('/bill/month',  billingController.getBillByMonth);


/**
 * @swagger
 * /billing/{id}:
 *  get:
 *      description: get  billing using id
 *      tags:
 *          - billing
 * 
 *      responses:
 *         200:
 *              description: Success  
 * 
 */
router.get('/bill/:id',  billingController.getBillById);

/**
 * @swagger
 * /bill/invoice/{id}:
 *  get:
 *      description: get  billing using id
 *      tags:
 *          - billing
 * 
 *      responses:
 *         200:
 *              description: Success  
 * 
 */
 router.get('/bill/invoice/:id',  billingController.getBillByInvoice);


//save a billing
/**
 * @swagger
 * /billing:
 *  post:
 *      description: Add billing
 *      tags:
 *          - billing
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
router.post('/bill',  billingController.postBill);

module.exports = router;
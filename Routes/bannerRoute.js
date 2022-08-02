const express = require('express');
const router = express.Router();

const banner = require('../Controllers/bannerController');


/**
 * @swagger
 * /banner:
 *  post:
 *      description: Add banner
 *      tags:
 *          - banner
 * 
 *      parameters:
 *          - name: imageUrl
 *            description: Url of the image for banner
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
router.post('/banner',  banner.createBanner);

/**
 * @swagger
 * /banner:
 *  get:
 *      description: get all banners 
 *      tags:
 *          - banner
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
router.get('/banner',  banner.getBanners);
/**
 * @swagger
 * /banner/{id}:
 *  get:
 *      description: get banner by id 
 *      tags:
 *          - banner
 * 
 *      responses:
 *         200:
 *              description: Success
 *  
 *  
 * 
 */
router.get('/banner/:id',  banner.getBannerById);
/**
 * @swagger
 * /banner/{id}:
 *  put:
 *      description: Update banner by id
 *      tags:
 *          - banner
 * 
 *      parameters:
 *          - name: imageUrl
 *            description: Url of the image for banner
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
router.put('/banner/:id',  banner.updateBanner);
/**
 * @swagger
 * /banner/{id}:
 *  delete:
 *      description: delete banner using id
 *      tags:
 *          - banner
 * 
 *
 *      responses:
 *         200:
 *              description: Success
 *  
 *  
 * 
 */
router.delete('/banner/:id',  banner.deleteBanner);


module.exports = router;
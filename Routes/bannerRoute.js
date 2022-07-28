const express = require('express');
const router = express.Router();

const banner = require('../Controllers/bannerController');
const apicache = require('apicache');
const cache = apicache.middleware;

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
router.post('/banner', cache('7days'), banner.createBanner);

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
router.get('/banner', cache('7days'), banner.getBanners);
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
router.get('/banner/:id', cache('7days'), banner.getBannerById);
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
router.put('/banner/:id', cache('7days'), banner.updateBanner);
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
router.delete('/banner/:id', cache('7days'), banner.deleteBanner);


module.exports = router;
const express = require('express');
const router = express.Router();

const banner = require('../Controllers/bannerController');
router.post('/banner', banner.createBanner);

router.get('/banner', banner.getBanners);
router.get('/banner/:id', banner.getBannerById);

router.put('/banner/:id', banner.updateBanner);
router.delete('/banner/:id', banner.deleteBanner);


module.exports = router;
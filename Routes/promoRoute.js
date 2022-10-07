const express = require('express');
const PromoController = require('../Controllers/promoController');
const router = express.Router();

router.post('/promo', PromoController.createPromo);
router.get('/promo', PromoController.getPromo);
router.put('/promo/:id', PromoController.updatePromo);
router.delete('/promo/:id', PromoController.deletePromo);


module.exports = router;

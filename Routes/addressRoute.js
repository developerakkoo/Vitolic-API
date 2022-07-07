const express = require('express');
const addressController = require('../Controllers/addressController');
const router = express.Router();

router.get('/address/:userId', addressController.getAddressByUserId);
router.post('/address', addressController.postAddress);
router.put('/address/:id', addressController.updateAddress);
router.delete('/address/:id', addressController.deleteAddress);

module.exports = router;
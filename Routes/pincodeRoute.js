const express = require('express');
const router = express.Router();

const pincode = require('../Controllers/pincodeController');
router.post('/pincode',pincode.createPincode);

router.get('/pincode',pincode.getPincodes);

router.put('/pincode/:id', pincode.updatePincode);
router.delete('/pincode/:id', pincode.deletePincode);


module.exports = router;
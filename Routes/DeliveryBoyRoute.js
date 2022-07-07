const express = require('express');
const router = express.Router();
const boyController = require('../Controllers/DeliveryBoyController');



router.post('/boy/login', boyController.loginUser);
router.post('/boy/register', boyController.postSignup);

router.put('/boy/:id', boyController.updateBoyById);    

router.get('/boy/:id', boyController.getBoyById);
router.get('/boy', boyController.getBoys);
router.get('/boy/assign/:id/:orderId/:slotId', boyController.getBoyAndAssignOrder);


router.delete('/boy/:id',boyController.deleteBoyById);









module.exports = router;

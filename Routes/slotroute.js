const express = require('express');

const slotController = require('../Controllers/slotController');
const router = express.Router();


router.post('/slot', slotController.postSlot);

router.get('/slot', slotController.getSlot);
router.get('/slot/date/:date', slotController.getSlotByDate);
router.get('/slot/:id', slotController.getSlotById);
router.get('/slot/assign/:id/:orderId', slotController.assignSlot);

router.put('/slot/:id', slotController.putSlot);

router.delete('/slot/:id', slotController.deleteSlot);




module.exports = router;
const express = require('express');
const placedOrderController = require('../Controllers/placedOrderController');

const router = express.Router();

router.get('/place/:userId', placedOrderController.getOrderByUser);
router.get('/place/order/:orderId', placedOrderController.getOrder);
router.get('/place', placedOrderController.getAllOrders);
router.get('/place/date/:date', placedOrderController.getOrderByDate);


router.post('/createorder', placedOrderController.createOrder);
router.post('/verifyorder', placedOrderController.verifyOrderSignature);
router.post('/place', placedOrderController.placeOrder);

router.put('/place/:id', placedOrderController.updatePlacedOrder);
router.delete('/place/:id',placedOrderController.deletePlacedOrder);




module.exports = router;
const express = require('express');

const subscriptionController = require('../Controllers/subscriptionController');
const router = express.Router();


router.post('/subscription', subscriptionController.postSubscription);

router.get('/subscription', subscriptionController.getSubscription);




module.exports = router;
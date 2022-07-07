const express = require('express');
const UserAuthController = require('../Controllers/userAuthController');


const router = express.Router();



router.post('/user/login', UserAuthController.loginUser);
router.post('/user/register', UserAuthController.postSignup);


router.get('/user', UserAuthController.getAllUsers);
router.get('/user/:id', UserAuthController.getUser);


router.put('/user/:id', UserAuthController.updateUser);

router.delete('/user/:id', UserAuthController.deleteUser);


module.exports = router;
const express = require('express');
const UserController = require('../Controllers/userController');
const router = express.Router();

//auth routes starrt

router.post('/token', UserController.getToken);
router.post('/verify', UserController.verifyToken);


//auth routes end

router.get('/user/profiles', UserController.getAllUsers);
router.get('/user/profile/:userId', UserController.getUserProfile); 

router.post('/user/login', UserController.loginUser);
router.post('/user/register', UserController.postSignup);

router.post('/user/profiles', UserController.createUser);

router.put('/user/profiles/:id', UserController.updateUser);

router.delete('/user/profiles/:id', UserController.deleteUserProfile);

module.exports = router;
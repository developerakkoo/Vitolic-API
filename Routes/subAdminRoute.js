const express = require('express');
const {body} = require('express-validator');
const authController = require('./../Controllers/subAdminController');

const router = express.Router();



router.post('/subadminlogin', authController.postLogin);
router.post('/subadminsignup',
[
    body('email').isEmail().withMessage('Please enter a valid email!'),
    body('password').trim().isLength({min: 5})
],
authController.postSignup);




module.exports = router;
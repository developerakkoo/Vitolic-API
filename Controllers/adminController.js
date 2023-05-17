const Admin = require('.././Models/adminModel');
const User = require('../Models/userModel');
const Subscription = require('../Models/subscriptionModel');
const Product =  require('../Models/productModel')
const Refund = require('../Models/refundModel')
const subOrder =  require('../Models/subOrderModel')
const mongoosePaginate = require('mongoose-paginate');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');




exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    let loadedUser;


    Admin.findOne({ email: email})
    .then(admin => {
        if(!admin){
            const error = new Error('Admin not found');
            error.status = 404;
            next(error);
        }

        loadedUser = admin;

        bcrypt.compare(password, admin.password)
        .then(doMatch => {
            if(!doMatch){
               const error = new Error('Password do not match');
               error.status = 401;
               next(error);
            }

            const token = jwt.sign({
                email: loadedUser.email,
                userId: loadedUser._id.toString(),
            },"!23ThisisaSecretFor@#$%^%^^&&allthebest", {expiresIn: '3h'})

            res.status(200).json({
                message: 'Sign In Successfull',
                token: token,
                userId: loadedUser._id.toString()
            })
        });
    }).catch(err =>{
        res.status(400).json({message: err.message, status:'error'});
    })
}


exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    Admin.findOne({ email: email})
    .then(admin => {
        if(admin){
           res.status(400).json({
               status: false,
               message: 'User with email Already Exists'
           })
        }

        bcrypt.hash(password, 12)
        .then((hashedPasswords) => {
            const admin = new Admin({
                email: email,
                password: hashedPasswords
            })
    
            return admin.save();
        }).then((result) => {
            res.status(201).json({message: 'Admin Created Successfully!', status: '201', userId: result._id});
        })
    })
    
    .catch(err =>{
    res.status(400).json({message: error.message, status:'error'});
    })
}




exports.totalUser = async (req,res) =>{
    const pipeline = [[
        {
        '$count': 'Total user'
        }
    ]]
    try{
        const userCount = await User.aggregate(pipeline)
        res.status(200).json({label:'userCount',userCount})
    }catch(err){
        res.status(500).json({message:"something went wrong"})
    }
}

exports.activeSubscriber = async (req,res) =>{
    const pipeline = [
        [
            {
            '$match': {
                'isActive': true
            }
            }, {
            '$project': {
                'subscription ID': '$_id', 
                'userId': '$userId'
            }
            }
        ]
    ]
    try{
        const activeSubscriber = await Subscription.aggregate(pipeline)
        res.status(200).json({label:'activeSubscriber', count:activeSubscriber.length,activeSubscriber})
    }catch(err){
        res.status(500).json({message:"something went wrong"})
    }
}


exports.notActiveSubscriber = async (req,res) =>{
    const pipeline = [
        [
            {
            '$match': {
                'isActive': false
            }
            }, {
            '$project': {
                'subscription ID': '$_id', 
                'userId': '$userId'
            }
            }
        ]
    ]
    try{
        const notActiveSubscriberCount = await Subscription.aggregate(pipeline)
        res.status(200).json({label:'notActiveSubscriber', count:notActiveSubscriberCount.length,notActiveSubscriberCount})
    }catch(err){
        res.status(500).json({message:"something went wrong"})
    }
}


exports.outOfStockProducts = async (req,res) =>{
    const pipeline = [
        [
            {
            '$match': {
                'stock': 0
            }
            }
        ]
    ]
    try{
        const outOfStockProductsCount = await Product.aggregate(pipeline)
        res.status(200).json({label:'outOfStockProducts', count:outOfStockProductsCount.length,outOfStockProductsCount})
    }catch(err){
        res.status(500).json({message:"something went wrong"})
    }
}

exports.totalRefund = async (req,res) =>{
    const pipeline = [[
        {
        '$count': 'Total Refunds'
        }
    ]]
    try{
        const RefundCount = await Refund.aggregate(pipeline)

        res.status(200).json({label:'Refund', count:RefundCount.length,RefundCount})
    }catch(err){
        res.status(500).json({message:"something went wrong"})
    }
}

exports.yearlyEarnings  = async (req,res) =>{
    const pipeline = [
        [
            {
            '$project': {
                'total': true, 
                'createdAt': {
                '$year': '$createdAt'
                }
            }
            }, {
            '$group': {
                '_id': '$createdAt', 
                'totalYearlyEarning': {
                '$sum': '$total'
                }
            }
            }
        ]
    ]
    try{
        const earnings = await subOrder.aggregate(pipeline)
        
        res.status(200).json({label:'yearlyEarnings', count:earnings.length,earnings})
    }catch(err){
        res.status(500).json({message:"something went wrong"})
    }
}


exports.monthlyEarning  = async (req,res) =>{
    const pipeline = [
        [
            {
            '$project': {
                'total': true, 
                'createdAt': {
                '$month': '$createdAt'
                }
            }
            }, {
            '$group': {
                '_id': '$createdAt', 
                'totalMonthlyEarning': {
                '$sum': '$total'
                }
            }
            }
        ]
    ]
    try{
        const earnings = await subOrder.aggregate(pipeline)
        
        res.status(200).json({label:'monthlyEarning', count:earnings.length,earnings})
    }catch(err){
        res.status(500).json({message:"something went wrong"})
    }
}
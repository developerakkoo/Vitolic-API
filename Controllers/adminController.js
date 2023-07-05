const Admin = require('.././Models/adminModel');
const User = require('../Models/userModel');
const Subscription = require('../Models/subscriptionModel');
const placedOrder = require('../Models/placeOrderModel');
const Product =  require('../Models/productModel')
const Refund = require('../Models/refundModel')
const subOrder =  require('../Models/subOrderModel')
const mongoosePaginate = require('mongoose-paginate');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const io = require('../socket');
const moment = require('moment');
const Cart = require('../Models/orderModel');




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
        const userCount = await User.aggregate(pipeline);
        io.getIO().emit('userCount:get', userCount);
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
        const activeSubscriber = await Subscription.aggregate(pipeline);
        io.getIO().emit('activeSubscriber:get', activeSubscriber);
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
        const notActiveSubscriberCount = await Subscription.aggregate(pipeline);
        io.getIO().emit('notActiveSubscriberCount:get', notActiveSubscriberCount);
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
        const outOfStockProductsCount = await Product.aggregate(pipeline);
        io.getIO().emit('outOfStockProducts:get', outOfStockProductsCount);
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
        io.getIO().emit('Refund:get', RefundCount);
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
        io.getIO().emit('yearlyEarnings:get', earnings);
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
        io.getIO().emit('monthlyEarning:get', earnings);
        res.status(200).json({label:'monthlyEarning', count:earnings.length,earnings})
    }catch(err){
        res.status(500).json({message:"something went wrong"})
    }
}


exports.totalOrder =  async(req,res)=>{
    try{
        const totalOrder =  await placedOrder.find({});
        if(totalOrder){
            res.status(200).json({ status: true, message:'totalOrder fetched successfully', totalOrder: totalOrder, Length:totalOrder.length})
            io.getIO().emit('totalOrder:get', totalOrder);
        }
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

exports.totalCompletedOrder =  async(req,res)=>{
    try{
        const totalCompletedOrder =  await placedOrder.find({isDelivered:true});
        if(totalCompletedOrder){
            res.status(200).json({ status: true, message:'totalCompletedOrder fetched successfully', totalCompletedOrder: totalCompletedOrder, Length:totalCompletedOrder.length})
            io.getIO().emit('totalCompletedOrder:get', totalCompletedOrder);
        }
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

exports.getDeliveryFrequencyCount =  async(req,res)=>{
    const pipeline = [
        [
            {
            '$match': {
                'deliveryFrequency': 'DAILY'
            }
            }, {
            '$group': {
                '_id': 'DAILY', 
                'value': {
                '$count': {}
                }
            }
            }
        ]
    ]
    const pipeline1 =[
        [
            {
            '$match': {
                'deliveryFrequency': 'ALTERNATE'
            }
            }, {
            '$group': {
                '_id': 'ALTERNATE', 
                'value': {
                '$count': {}
                }
            }
            }
        ]
    ]
    const pipeline2 = [
        [
            {
            '$match': {
                'deliveryFrequency': 'CUSTOM'
            }
            }, {
            '$group': {
                '_id': 'CUSTOM', 
                'value': {
                '$count': {}
                }
            }
            }
        ]
    ]
    try{
        const daily = await Subscription.aggregate(pipeline);
        const alternate = await Subscription.aggregate(pipeline1)
        const custom = await Subscription.aggregate(pipeline2)
        let post =[daily[0],alternate[0],custom[0]]
        // io.getIO().emit('monthlyEarning:get', earnings);
        res.status(200).json({label:`DeliveryFrequencyReport`,post})
    }catch(err){
        res.status(500).json({message:"something went wrong"})
    }
}


exports.getSummary =  async(req,res)=>{
    try{
        const pageNumber = req.query.page || 1; // Get the current page number from the query parameters
        const pageSize = 10; // Number of items per page
        
        Cart.paginate({}, { page: pageNumber, limit: pageSize }, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error occurred while fetching Data.' });
        }
        
        const { docs, total, limit, page, pages } = result;
        res.json({ users: docs, total, limit, page, pages });
        });
    }catch(err){
        console.log(err)
        res.status(500).json({message:"something went wrong"})
    }
}



exports.getOrderStatus =  async(req,res)=>{
    
    const pipeline =[
        [
            {
            '$match': {
                'terminate': true
            }
            }, {
            '$group': {
                '_id': 'terminate', 
                'value': {
                '$count': {}
                }
            }
            }
        ]
    ]
    const pipeline1 = [
        [
            {
            '$match': {
                'isPause': true
            }
            }, {
            '$group': {
                '_id': 'Pause', 
                'value': {
                '$count': {}
                }
            }
            }
        ]
    ]
    try{
        const terminate = await Cart.aggregate(pipeline);
        const Pause = await Cart.aggregate(pipeline1)

        let post =[terminate[0],Pause[0]]
        // io.getIO().emit('monthlyEarning:get', earnings);
        res.status(200).json({label:`OrderStatusReport`,post})
    }catch(err){
        res.status(500).json({message:"something went wrong"})
    }
}


exports.getSummaryByDate =  async(req,res)=>{
    const pipeline =[
        [
            {
            '$match': {
                'refDate': req.params.date
            }
            },
        ]
    ]

    try{
        const post = await Cart.aggregate(pipeline)

        // let post =[terminate[0],Pause[0]]
        // io.getIO().emit('monthlyEarning:get', earnings);
        res.status(200).json({label:`OrderSummeryByDate`,name:req.params.date,value:post})
    }catch(err){
        console.log(err);
        res.status(500).json({message:"something went wrong"})
    }
}


exports.getSummaryByTodaysDate =  async(req,res)=>{
    
    const pipeline =[
        [
            {
            '$match': {
                'refDate': moment().format("DD-MM-YYYY")
            }
            },
        ]
    ]
    try{
        const post = await Cart.aggregate(pipeline);
        
        // let post =[terminate[0],Pause[0]]
        // io.getIO().emit('monthlyEarning:get', earnings);
        res.status(200).json({label:`orderSummaryByTodaysDate`,name:moment().format("DD-MM-YYYY"),value:post})
    }catch(err){
        res.status(500).json({message:"something went wrong"})
    }
}


exports.get = async(req,res) =>{


    const sub =  await Cart.updateMany({refDate:"22-05-2023"})
    res.status(200).json("ok")
}
const Boy = require('../Models/DeliveryBoyModel');
const Slot = require('../Models/slotModel');
const PlacedOrder = require('../Models/placeOrderModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



exports.loginUser = async(req, res, next) =>
{
    const email = req.body.email;
    const password = req.body.password;

    let loadedUser;


    Boy.findOne({ email: email})
    .then(user => {
        if(!user){
           res.status(400).json({message: 'User not found', status:'error'})
        }

        loadedUser = user;

        bcrypt.compare(password, user.password)
        .then(doMatch => {
            if(!doMatch){
                res.status(400).json({message: 'Password do not match', status:'error'})

            }

            const token = jwt.sign({
                email: loadedUser.email,
                userId: loadedUser._id.toString(),
            },"!23ThisisaSecretFor@#$%^%^^&&allthebest", {expiresIn: '3h'})

            res.status(200).json({
                message: 'Sign In Successfull',
                token: token,
                userId: loadedUser._id.toString(),
                expiresIn: '3h'
            })
        });
    }).catch(err =>{
        res.status(500).json({err, message: 'Something went wrong!'})

    })
}


exports.postSignup = (req, res, next) => {

    const fullName = req.body.fullName;
    const contactNumber = req.body.contactNumber;
    const email = req.body.email;
    const password = req.body.password;

    Boy.findOne({ email: email})
    .then(user => {
        if(user){
            res.status(400).json({
                status: false,
                message: 'User with email already exists. Please use another email.'
            })
        }

        bcrypt.hash(password, 12)
        .then((hashedPasswords) => {
            const user = new Boy({
                email: email,
                password: hashedPasswords,
                fullName: fullName,
                contactNumber: contactNumber
            })
    
            return user.save();
        }).then((result) => {
            res.status(201).json({message: 'User Created Successfully!', status: '201', userId: result._id});
        })
    })
    
   .catch(err =>{
        res.status(500).json({error: err.message, message: 'Something went wrong!'})
    })

}


exports.getBoyById = async(req, res, next) =>{
    try {
        const id = req.params.id;

        const boy = await Boy.findById(id).populate("orders orders.productId slot");

        if(boy){
            res.status(200).json({
                message: 'User Found',
                boy
            })
        }
    } catch (err) {
        res.status(500).json({error: err.message, message: 'Something went wrong!'})
        
    }
}

exports.getBoys = async(req, res, next) =>{
    try {

        const boy = await Boy.find({});

        if(boy){
            res.status(200).json({
                message: 'User Found',
                boy
            })
        }
    } catch (err) {
        res.status(500).json({error: err.message, message: 'Something went wrong!'})
        
    }
}

exports.updateBoyById = async(req, res, next) =>{
    try {
        const id = req.params.id;
        
        const boy = await Boy.findByIdAndUpdate(req.body);

        if(boy){
            res.status(201).json({message: 'User updated Successfully', boy});
        }
    } catch (err) {
        res.status(500).json({error: err.message, message: 'Something went wrong!'})
        
    }
}


exports.deleteBoyById = async(req, res, next) =>{
    try {
        const id = req.params.id;

        const boy = await Boy.findByIdAndDelete(id);

        if(boy){
            res.status(200).json({
                message: 'User Deleted Successfully',
                boy
            })
        }
    } catch (err) {
        res.status(500).json({error: err.message, message: 'Something went wrong!'})
        
    }
}

exports.getBoyAndAssignOrder = async(req, res, next) =>{
    try {
        const id = req.params.id;
        const slotId = req.params.slotId;
        const orderId = req.params.orderId;

        Boy.findByIdAndUpdate(id, {
            $addToSet: { orders: orderId, slot: slotId}
        }, {upsert: true},(error,doc) =>{
            if(error){
                res.status(404).json({ status: false,  error: error, message: error.message })
            }

            res.status(200).json({
                status: true,
                message: "Assigned order to Delivery Boy",
                doc
            })
        })



    } catch (error) {
        res.status(500).json({error: err.message, message: 'Something went wrong!'})
        
    }
}
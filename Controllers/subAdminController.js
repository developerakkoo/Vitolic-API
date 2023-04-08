const SubAdmin = require('.././Models/subAdminModel');

const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


exports.updateSubAdmin = async(req, res, next) =>{
    try{
        let id = req.params.id;

        const subAdmin = await SubAdmin.findByIdAndUpdate(id, req.body);

        if(subAdmin){
            res.status(201).json({
                message:"Sub Admin Updated!",
                subAdmin
            })
        }
        else{
            res.status(400).json({
                message:"Something went wrong!"
            })
        }
    }

    catch(error){
        res.status(400).json({message: error.message, status:'error'});
    }
}

exports.getSubAdminById = async(req, res, next) =>{
    try{
        let id = req.params.id;

        const subAdmin = await SubAdmin.findById(id, req.body);

        if(subAdmin){
            res.status(201).json({
                message:"Sub Admin Found!",
                subAdmin
            })
        }
        else{
            res.status(400).json({
                message:"Something went wrong!"
            })
        }
    }

    catch(error){
        res.status(400).json({message: error.message, status:'error'});
    }
}


exports.getAllSubAdmin = async(req, res, next) =>{
    try{

        const subAdmin = await SubAdmin.find({});

        if(subAdmin){
            res.status(201).json({
                message:"All Sub Admin!",
                subAdmin
            })
        }
        else{
            res.status(400).json({
                message:"Something went wrong!"
            })
        }
    }

    catch(error){
        res.status(400).json({message: error.message, status:'error'});
    }
}

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    let loadedUser;


    SubAdmin.findOne({ email: email})
    .then(subAdmin => {
        if(!subAdmin){
            const error = new Error('Sub Admin not found');
            error.status = 404;
            next(error);
        }
        loadedUser = subAdmin;

        bcrypt.compare(password, subAdmin.password)
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
        res.status(400).json({message: error.message, status:'error'});
    })
}


exports.postSignup = (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;


    const isProductAdd = req.body.isProductAdd;
    const isProductEdit = req.body.isProductEdit;
    const isProductDelete = req.body.isProductDelete;

    const isBannerAdd = req.body.isBannerAdd;
    const isBannerDelete = req.body.isBannerDelete;
    const isBannerEdit = req.body.isBannerEdit;

    const isOrderAdd = req.body.isOrderAdd;
    const isOrderEdit = req.body.isOrderEdit;
    const isOrderDelete = req.body.isOrderDelete;

    const isUserAdd = req.body.isUserAdd;
    const isUserDelete = req.body.isUserDelete;
    const isUserEdit = req.body.isUserEdit;

    const isBoyAdd = req.body.isBoyAdd;
    const isBoyDelete = req.body.isBannerDelete;
    const isBoyEdit = req.body.isBannerEdit;

    const isPromoAdd = req.body.isPromoAdd;
    const isPromoEdit = req.body.isPromoEdit;
    const isPromoDelete = req.body.isPromoDelete;

    const isSubscriptionAdd = req.body.isSubscriptionAdd;
    const isSubscriptionEdit = req.body.isSubscriptionEdit;
    const isSubscriptionDelete = req.body.isSubscriptionDelete;

    const isCityAdd = req.body.isCityAdd;
    const isCityEdit = req.body.isCityEdit;
    const isCityDelete = req.body.isCityDelete;



    SubAdmin.findOne({ email: email})
    .then(subAdmin => {
        if(subAdmin){
           res.status(400).json({
               status: false,
               message: 'Sub Admin with email Already Exists'
           })
        }

        bcrypt.hash(password, 12)
        .then((hashedPasswords) => {
            const subAdmin = new SubAdmin({
                email: email,
                password: hashedPasswords,
                isProductAdd: isProductAdd,
                isProductDelete: isProductDelete,
                isProductEdit: isProductEdit,

                isOrderAdd: isOrderAdd,
                isOrderDelete: isOrderDelete,
                isOrderEdit: isOrderEdit,


                isUserAdd: isUserAdd,
                isUserDelete: isUserEdit,
                isUserEdit: isUserEdit,

                isBoyAdd: isBoyAdd,
                isBoyDelete: isBoyDelete,
                isBoyEdit: isBoyEdit,

                isPromoAdd: isPromoAdd,
                isPromoDelete: isPromoDelete,
                isPromoEdit: isPromoEdit,

                isBannerAdd: isBannerAdd,
                isBannerDelete: isBannerDelete,
                isBannerEdit: isBannerEdit,

                isSubscriptionAdd: isSubscriptionAdd,
                isSubscriptionDelete: isSubscriptionDelete,
                isSubscriptionEdit: isSubscriptionEdit,

                isCityAdd: isCityAdd,
                isCityDelete: isCityDelete,
                isCityEdit: isCityEdit


            })
    
            return subAdmin.save();
        }).then((result) => {
            res.status(201).json({message: 'Sub Admin Created Successfully!', status: '201', userId: result._id});
        })
    })
    
   .catch(err =>{
    res.status(400).json({message: error.message, status:'error'});
    })

   

}



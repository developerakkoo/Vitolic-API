const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserAuth = require('../Models/userAuthModel');


exports.loginUser = async(req, res, next) =>{
    const email = req.body.email;
    const password = req.body.password;

    let loadedUser;


    UserAuth.findOne({ email: email})
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


    const email = req.body.email;
    const password = req.body.password;

    UserAuth.findOne({ email: email})
    .then(user => {
        if(user){
            res.status(400).json({
                status: false,
                message: 'User with email already exists. Please use another email.'
            })
        }

        bcrypt.hash(password, 12)
        .then((hashedPasswords) => {
            const user = new UserAuth({
                email: email,
                password: hashedPasswords
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


exports.getAllUsers = async(req, res, next) => {
    try{
    const users = await UserAuth.find({});

    if(!users){
        next(new Error('No users found'));
    }

    res.status(200).json({users})
    }catch (error) {
        res.status(500).json({error, message: 'Something went wrong!'});
    }

}


exports.getUser = async(req, res, next) => {
    try {
        const id = req.params.id;

        const user = await UserAuth.findById(id);
        if(user){
            res.status(200).json({user, message: 'User found'})
        }
    } catch (error) {
        res.status(500).json({error, message: 'Something went wrong!'});
    }

}


exports.updateUser = async(req, res, next) => {
    try {
        const id = req.params.id;

        const user = await UserAuth.findByIdAndUpdate(id, req.body);

        if(user){
            res.status(201).json({status: 'success', user: user, message: 'Profile updated successfully!'})
        }
        
    } catch (error) {
        res.status(500).json({error, message: 'Something went wrong!'});
    }
}


exports.deleteUser = async(req, res, next) => {
    try {
        const id = req.params.id;

        const user = await UserAuth.findByIdAndDelete(id);

        if(user){
            res.status(200).json({
                status: true,
                message: 'User Deleted Successfully'
            })
        }
        
    } catch (error) {
        res.status(500).json({error, message: 'Something went wrong!'});
    }
}
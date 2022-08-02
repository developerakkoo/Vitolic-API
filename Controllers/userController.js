const User = require('../Models/userModel');
const client = require('twilio')("AC98980efd829b8762ab909275ce10846d", "43afffd4206d5e264906e819e302045a");

const AppError = require("../Utils/app.Error");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const io = require('../socket');

exports.getToken = async (req, res, next) => {
    const phonenumber = req.body.phonenumber;

    console.log("PHONE:- " + phonenumber);
    client.verify.services('VAd9cf754966edfca3471746c788ee7812')
        .verifications
        .create({
            to: phonenumber,
            channel: 'sms'
        }).then((success) => {
            res.status(200).json({
                status: 'success',
                success: success
            })
        }).catch((error) => {
            res.status(200).json({
                status: 'error',
                error: error,
                message: 'Something went wrong!'
            })
        })
}

exports.verifyToken = async (req, res, next) => {

    const code = req.body.code;
    const phonenumber = req.body.phonenumber;


    client.verify.services("VAd9cf754966edfca3471746c788ee7812")
        .verificationChecks
        .create({

            to: phonenumber,
            code: code

        }).then((success) => {
            res.status(200).json({ success })
        }).catch((error) => {
            res.status(401).json({ status: 'error', error, message: 'Something went wrong!' })
        })
}


exports.loginUser = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    let loadedUser;


    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                res.status(400).json({ message: 'User not found', status: 'error' })
            }

            loadedUser = user;

            bcrypt.compare(password, user.password)
                .then(doMatch => {
                    if (!doMatch) {
                        res.status(400).json({ message: 'Password do not match', status: 'error' })

                    }

                    const token = jwt.sign({
                        email: loadedUser.email,
                        userId: loadedUser._id.toString(),
                    }, "!23ThisisaSecretFor@#$%^%^^&&allthebest", { expiresIn: '3h' })


                    res.status(200).json({
                        message: 'Sign In Successfull',
                        token: token,
                        userId: loadedUser._id.toString(),
                        expiresIn: '3h'
                    })
                });
        }).catch(err => {
            res.status(500).json({ err: err.message, message: 'Something went wrong!' })

        })
}



exports.postSignup = (req, res, next) => {

    const fName = req.body.fName;
    const email = req.body.email;
    const contactNo = req.body.contactNumber;

    const couponCode = req.body.couponCode;
    const walletCashbackAvailable = req.body.walletCashbackAvailable;



    User.findOne({ contactNumber: contactNo })
        .then(user => {
            if (user) {
                res.status(201).json({ message: 'User Logged  Successfully!', status: '201', userId: user._id });
            }


            const newuser = new User({
                fName: fName,
                email: email,
                contactNumber: contactNo,
                address: req.body.address,
                walletCashbackAvailable: walletCashbackAvailable,
                couponCode: couponCode,
            })

            newuser.save().then((result) => {
                res.status(201).json({ message: 'User Created Successfully!', status: '201', userId: result._id });
            })
        })

        .catch(err => {
            res.status(500).json({ error: err.message, message: 'Something went wrong!' })
        })

}



exports.createUser = async (req, res, next) => {
    try {
        const fName = req.body.fName;
        const lName = req.body.lName;
        const email = req.body.email;
        const contactNumber = req.body.contactNumber;
        const verificationStatus = req.body.verificationStatus;
        const couponCode = req.body.couponCode;
        const walletCashbackAvailable = req.body.walletCashbackAvailable;


        const user = new User({
            userId: userId,
            fName: fName,
            lName: lName,
            email: email,
            contactNumber: contactNumber,
            verificationStatus: verificationStatus,

            walletCashbackAvailable: walletCashbackAvailable,
            couponCode: couponCode,


        })

        user.save().then((result) => {
            if (result) {
                res.status(200).json({
                    status: 'success',
                    message: "Profile Created Successfully!",
                    result
                });

            }
        }).catch((error) => {
            res.status(500).json({ error: error, message: error.message, data: 'Error in creating user' })

        })



    } catch (error) {
        res.status(500).json({ error, message: error.message })
    }
}


exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({}).populate('products');

        if (users) {
            res.status(200).json({
                message: 'All Users',
                users
            })
        }
    } catch (error) {
        res.status(500).json({ error, message: error.message })

    }
}



exports.getUser = async (req, res, next) => {
    try {
        const id = req.params.id;

        const user = await UserAuth.findById(id).populate('products');
        if (user) {
            res.status(200).json({ user, message: 'User found' })
        }
    } catch (error) {
        res.status(500).json({ error, message: 'Something went wrong!' });
    }

}

exports.getUserProfile = async (req, res, next) => {
    try {
        const userId = req.params.userId;

        const user = await User.findById(userId).populate('cart.items.productId');
        if (user) {
            res.status(200).json({ user, message: 'User Profile Found!' })
        }
    } catch (error) {
        res.status(500).json({ error, message: 'Something went wrong!' });

    }
}


exports.updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;

        const user = await User.findOneAndUpdate({ _id: id }, req.body);

        if (user) {
            res.status(201).json({ status: 'success', user: user, message: 'Profile updated successfully!' });
        }

    } catch (error) {
        res.status(500).json({ error, message: 'Something went wrong!' });
    }
}


exports.deleteUserProfile = async (req, res, next) => {
    try {
        const id = req.params.id;

        const user = await User.findByIdAndDelete(id);

        if (user) {
            res.status(200).json({
                status: true,
                message: 'User Profile Deleted Successfully'
            })
        }

    } catch (error) {
        res.status(500).json({ error, message: 'Something went wrong!' });
    }
}

exports.getSubscription = async (req, res, next) => {
    try {
        const id = req.params.id;

        const user = await User.findById(id);

        if (user) {
            res.status(200).json({
                status: true,
                message: 'User Profile Deleted Successfully'
            })
        }

    } catch (error) {
        res.status(500).json({ error, message: 'Something went wrong!' });
    }
}
/* 
exports.postSubscription = async (req, res, next) => {

    const isMonth = req.body.isMonth;
    const isAlternate = req.body.isAlternate;
    /* switch(subEndDate){
        case isMonth:
            subEndDate= Date.today().add(30).day();
            break;
        case isAlternate:
            subEndDate= Date.today().add(30).day();
            break;
        default:
            console.log("Please select Subscription type");
            break;
    } */
    /*  if(isMonth===true){
       let subEndDate= Date.today().add(30).day();
       return subEndDate;
     } */
    /* }
    else if(isAlternate===true){
         let subEndDate= Date.today().add(60).day()
        //return subEndDate;
    }
    else{
        console.log("Please select a subscription type");
    }  */
/*
    const subscription = new User({
        isMonth: isMonth,
        isAlternate: isAlternate,

    });

    subscription.save().then((result) => {
        console.log("Subscription Created!");

        res.status(201).json({
            result,
            message: "Subscription Created",
        });
        io.getIO().emit('subscription:create', { action: 'created', subscription })

    }).catch((err) => {
        res.status(500).json({
            status: false,
            message: err.message
        })
    })
};

exports.endDate= async (req, res, next) => {
   
        let endDate = res.body.subEndDate;

        const user = await User.find({}).populate('subscription');

        if (isMonth==true) 
             endDate= Date.today().add(30).day();
             else if(isAlternate)endDate= Date.today().add(30).day();
        
            const sub = new User({
                subEndDate: endDate,
                
        
            });
        
            sub.save().then((result) => {
                console.log("Subscription Created!");
            
                res.status(201).json({
                    result,
                    message: endDate,
                });
                io.getIO().emit('subscription:create', { action: 'created', subscription })
        
            }).catch((err) => {
                res.status(500).json({
                    status: false,
                    message: err.message
                })
            })
        }
     */

/* exports.promoCode =async (req, res, next) => {
    try {
        const id = req.params.id;

        const user = await User.findById(id);

        if (user) {
            voucher_codes.generate({
                length: 8,
                count: 1
            });
            res.status(200).json({
                status: true,
                message: 'User Profile Deleted Successfully'
            })
        }

    } catch (error) {
        res.status(500).json({ error, message: 'Something went wrong!' });
    }
}
 */

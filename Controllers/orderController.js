const Order = require('../Models/orderModal');
const AppError = require('../Utils/app.Error');
const User = require('../Models/userModel');
const Product = require('../Models/productModel');
const io = require('../socket');

const razorpay = require('razorpay');

var instance = new razorpay({
    key_id:'rzp_test_q92KbX0ZwFyaN0',
    key_secret:'UsklYi4BRYogWcehPPjnBtSu',
});


exports.createOrder = async(req, res, next) => {
    try {
        const amount = req.body.amount;
        
        var options = {
            amount: amount,
            currency:'INR'
        }

        instance.orders.create(options, function(err, order) {
            console.log("ORDER: " + order);

            if(err) {
                res.status(400).json({ message: err.message, status: 'error' });
            }

            res.status(201).json({status: 'success', message: 'Order Created.', order});
        });
    } catch (error) {
        res.status(400).json({message: error.message, status:'error'});
    }
}

exports.AddToCart = async(req, res, next) => {
    try {
        const productId = req.body.productId;
        const userId = req.body.userId;

        Product.findById(productId)
        .then(async (product) =>{
            if(product){
                const user = await User.findById(userId);//.populate('cart.items.productId');
                if(user){
                    console.log("FOUIND USER "+ user);
                    console.log("FOUND PRODUCT "+ product);
                    return user.addToCart(product);
                   
                }

            }
        }).then(result =>{
            console.log(result);
            res.status(200).json({status: 'success', message: 'Added Product to cart'})
        }).catch((error) =>{
            res.status(500).json({
                status: 'error',
                error: error.message
            })
        })


    } catch (error) {
        res.status(401).json({
            status: 'error',
            error: error.message
        })
    }
}

exports.removeFromCart = async(req, res, next) => {
    try {
        const productId = req.body.productId;
        const userId = req.body.userId;

        Product.findById(productId).then(async (product) => {
            if(product){
                console.log("FOUND PRODUCT "+product);
                const user = await User.findById(userId);
                if(user){
                    console.log("FOUIND USER "+user);
                    return user.removeFromCart(productId);
                   
                }
               
            }
        }).then((deleted =>{
            res.status(201).json({
                status: 'success',
                deleted
            })
        })).catch((error) => {
            res.status(200).json({
                status: 'error',
                error: error.message
            })
        })

    } catch (error) {
        res.status(401).json({
            status: 'error',
            error: error.message
        })
    }
}


exports.clearCart = async(req, res, next) => {
    try {
       const userId = req.params.userId;

       const user = await User.findById(userId);
       if(user){
           user.clearCart();
           res.status(200).json({
               status:'success',
               message: 'Cart Successfully Cleared!'
              
           })
       }

    } catch (error) {
        res.status(401).json({
            status: 'error',
            error: error.message
        })
    }
}




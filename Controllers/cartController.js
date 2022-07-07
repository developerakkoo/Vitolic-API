const Cart = require('../Models/cartModel');
const io = require('../socket');
const User = require('../Models/userModel');
const Product = require('../Models/productModel');

exports.getCart = async(req, res, next) =>
{
    try {

        const cart = await Cart.find({});


        if(cart){
            res.status(200).json({
                status: true,
                count: cart.length,

                cart
            })
        }


    } catch (error) {
        res.status(500).json({
            status: false,
            message: error
        })
    }
}


exports.addToCart = async(req, res, next) =>{
   try {
    const {userId, productId} = req.body;

    const quantity = Number.parseInt(req.body.quantity);
    console.log("ADD TO CART METHOD");

   

    let cart = await Cart.find({userId: userId}, async(err, cart) =>{
        if(err){
            res.status(500).json({
                status: false,
                message: error.message
            })
        }
        console.log("CArt Exist"+ cart);
        const productDetails = await Product.findById(productId);



        res.status(200).json({
            status: true,
            message: productDetails
        })


    });

    

    //Check if cart exists and Check if product exists in the cart-----




   } catch (error) {
    res.status(500).json({
        status: false,
        message: error.message
    })
   }

}



exports.updateCart = async(req, res, next) => {
    try {
        
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}


exports.deleteCart = async(req, res, next) =>{
    try {
        
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}
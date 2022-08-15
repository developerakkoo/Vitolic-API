const Cart = require('../Models/cartModel');
const io = require('../socket');
const User = require('../Models/userModel');
const Product = require('../Models/productModel');

exports.getCartByUserId = async (req, res, next) => {
    try {
        
        const cart = await Cart.find({userId:req.params.id}).populate("userId address");

        if (cart) {
            res.status(200).json({
                status: true,
                count: cart.length,

                cart
            })
        } else { console.log("not found") }

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error
        })
    }
}
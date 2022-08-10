const Cart = require('../Models/cartModel');
const io = require('../socket');
const User = require('../Models/userModel');
const Product = require('../Models/productModel');

exports.getCartByCartId = async (req, res, next) => {
    try {
        
        const cart = await Cart.findById(req.params.id).populate("userId address");

        if (cart) {
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

exports.getCartByUserId = async (req, res, next) => {
    try {
        const cartId = req.params.id;
        
        const cart = await Cart.find(cartId).populate("userId address");

        if (cart) {
            res.status(200).json({
                status: true,
                count: cart.length,

                cart
            })
        }else {console.log("not found")}

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error
        })
    }
}

exports.getCart = async (req, res, next) => {
    try {

        const cart = await Cart.find({}).populate("userId address");
        //if (isDelivered)
        if (cart) {
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


exports.addToCart = async (req, res, next) => {
    try {
        const { userId, products, total, status, address } = req.body;

        console.log("ADD TO CART METHOD");
        let cart = new Cart({
            products: products,
            userId: userId,
            total: total,
            status: status,
            address: address
        });
        await cart.save();

        if (cart) {
            res.status(200).json({
                cart,
                message: 'Cart added successfully'
            })
        }

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }

}



exports.updateCart = async (req, res, next) => {
    try {
        const id = req.params.id;

        const cart = await Cart.findByIdAndUpdate(id, req.body);

        if (cart) {
            res.status(200).json({ cart, message: 'cart updated' })
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}


exports.deleteCart = async (req, res, next) => {
    try {
        const id = req.params.id;
        let cart = await Cart.findByIdAndDelete(id);
        if (cart) {
            res.status(200).send("Cart Delete Successfully");
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}
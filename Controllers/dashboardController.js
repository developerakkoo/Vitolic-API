const User = require('./userController');
const Cart = require('./cartController');
const Boy = require('./DeliveryBoyController');
const CartModel = require('../Models/cartModel');

exports.getLiveUsers = async (req, res, next) => {
    const liveUser = User.loginUser().token.length
    console.log(liveUser);
}

exports.getLiveBoys = async (req, res, next) => {

}

exports.getTotalOrders = async (req, res, next) => {
    try {

        const cart = await CartModel.find({}).sort({ _id: -1 }).populate("userId address");
        //let { isDelivered } = cart;
        //console.log(isDelivered)
        //let isDelivered = cart.isDelivered
        for (i = 0; i < cart.length; i++) {

            if (cart[i].isDelivered == false) {

                res.status(200).json({
                    status: true,
                    count: cart.length,
                })
                return;
            }
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error
        })
    }
}

exports.getEarning = async (req, res, next) => {
    try {

        const cart = await CartModel.find();

        if (cart) {
            CartModel.aggregate([{ $match: {} }, {
                $group:
                    { _id: null, sum: { $sum: "$total" } }
            }])
                .then(result => res.status(200).json({
                    status: true,
                    total: (result[0].sum)
                }));
        }

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error
        })
    }
}
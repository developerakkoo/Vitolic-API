const CartModel = require('../Models/cartModel');
const User = require('../Models/userModel');
const Boy = require('../Models/DeliveryBoyModel');


exports.getLiveUsers = async (req, res, next) => {
    try {

        const user = await User.find({});
        user = await user.isOnline ? res.status(200).json({
            status: true,
            count: user.length,
        }) : console.log("No User is Online");
        /* let { isOnline } = user[0];
        console.log(isOnline)
        //let isDelivered = user.isDelivered
        for (i = 0; i < user.length; i++) {

            if (user[i].isOnline == true) {

                res.status(200).json({
                    status: true,
                    count: user.length,
                })
                return;
            }
        } */
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error
        })
    }
}

exports.getLiveBoys = async (req, res, next) => {
    try {

        const user = await Boy.find({});
        user = await user.isOnline ? res.status(200).json({
            status: true,
            count: user.length
        }) : console.log("No Delivery Boy is Online");
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error
        })
    }

}

exports.getTotalOrders = async (req, res, next) => {
    try {

        const cart = await CartModel.find({}).sort({ _id: -1 }).populate("userId address");
        let { isDelivered } = cart;
        console.log(isDelivered)
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
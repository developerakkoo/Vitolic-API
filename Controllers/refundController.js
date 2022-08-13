const Refund = require('./../Models/refundModel');
const User = require('./../Models/userModel');
const Cart = require('./../Models/cartModel');
const Order = require('./../Models/orderModal');
const io = require('./../socket');

exports.postRefund = async (req, res, next) => {
    try {
        const userId = req.body.userId;
        const orderId = req.body.cartId;
        const description = req.body.discription;

        const refund = await Refund.create(req.body);

        if (!refund) {
            res.status(500).json({ message: 'Refund create error' })
        }

        res.status(200).json({
            refund: refund,
            message: 'Refund created Successfully',
        })
    }
    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
}

exports.getRefund= async (req, res, next) => {
    try {
        const refund = await Refund.find({});

        if (refund) {
            //Refund.findOne({ orderId: orderId }).populate("orders") // key to populate
                //.then(refund => {
                    res.status(200).json({
                        refund,
                        message: 'Refunds Found'
                    })
                //}) 

        }
    }
    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
}

exports.getRefundByUserId = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const orderId = req.params.userId;

        const refund = await Refund.find({ userId: userId });

        if (refund) {
            //Refund.findOne({ orderId: orderId }).populate("orders") // key to populate
                //.then(refund => {
                    res.status(200).json({
                        refund,
                        message: 'Refund Found'
                    })
                //}) 

        }
    }
    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
}

exports.updateRefund = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const refund = await Refund.findByIdAndUpdate(userId, req.body);

        if (refund) {
            res.status(200).json({ status: true, refund, message: 'Refund Updated' })
        }
        io.getIO.emit('refund:update', { refund: refund });
    }
    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
}


exports.deleteRefund = async (req, res, next) => {
    try {
        const userId = req.params.userId;

        const refund = await Refund.findByIdAndDelete(userId);

        if (refund) {
            res.status(200).json({ refund, message: 'Refund Deleted Successfully' })
        }
    }
    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
}
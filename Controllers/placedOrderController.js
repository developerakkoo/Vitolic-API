const PlacedOrder = require('../Models/placeOrderModel');
const Razorpay = require('razorpay');

const io = require('./../socket');
const { customAlphabet } = require('nanoid/async')

const nanoid = customAlphabet('1234567890', 6);

var instance = new Razorpay({
    key_id: 'rzp_test_q92KbX0ZwFyaN0',
    key_secret: 'UsklYi4BRYogWcehPPjnBtSu',
});

exports.createOrder = async (req, res, next) => {
    try {
        const amount = req.body.amount;

        var options = {
            amount: amount,
            currency: "INR",
        };
        instance.orders.create(options, function (err, order) {
            console.log(order);
            if (err) {
                res.status(200).json({
                    status: "error",
                    error: err,

                })
            }

            res.status(200).json({
                status: "success",
                message: "Order created successfully",
                order
            })
        });

    } catch (error) {
        res.status(200).json({
            status: 'error',
            message: error.message
        })
    }
}

exports.verifyOrderSignature = async (req, res, next) => {
    try {

        const signature = req.body.razorpay_signature;

        console.log("SIGNATURE " + req.body.razorpay_signature);

        const json = JSON.stringify(req.body);
        console.log(json);

        const generatedSignature = crypto
            .createHmac('sha256', "CeO2MFiU9CXpNtdxxee5fap8")
            .update(req.body.razorpay_payment_id + '|' + req.body.razorpay_order_id)
            .digest('hex');

        //const verify = await Razorpay.validateWebhookSignature(json, signature, "CeO2MFiU9CXpNtdxxee5fap8");
        //     console.log("VERIFIACTIONASDSAD   = " + verify);
        if (signature === generatedSignature) {
            res.status(200).json({
                status: 'success',
                message: 'Signature Verification Successfull',
                verified: true
            });

        } else {
            res.status(200).json({
                status: 'error',
                verified: false,
                message: 'Invalid signature'
            });
        }


    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        })
    }
}

exports.placeOrder = async(req, res, next) =>
{
    try {
        
        const order = await new PlacedOrder({
            orderId: await nanoid(),
            totalAmount: req.body.totalAmount,
            items: req.body.items,
            paymentMode: req.body.paymentMode,
            userId: req.body.userId,
            cordinates: req.body.coordinates,
            slot: req.body.slot
        })

        order.save();

        if(order){
            res.status(200).json({status: 'success', order});
            io.getIO().emit('placeorder:post', {order: order});
        }

    } catch (error) {
        
        
        res.status(200).json({
            status: 'error',
            error: error.message
        })
    }
}


exports.updatePlacedOrder = async(req, res, next) =>{
    try {
        const id = req.params.id;

        const order = await PlacedOrder.findByIdAndUpdate(id, req.body);
        if(order){
            res.status(201).json({status: 'success', message: 'Placed order updated successfully', order});
            io.getIO().emit('getAllPlaceOrder:get', {order: order});


        }
    } catch (error) {
        res.status(500).json({
            status: 'error',
            error: error.message
        })
    }
}

exports.deletePlacedOrder = async(req, res, next) => {
    try {
        const orderId = req.params.id;
        const order = await PlacedOrder.findByIdAndDelete(orderId);

        if(order){
            res.status(200).json({
                status: 'success',
                message: 'Order Cancled Successfully!'
            })
            io.getIO().emit('placeorder:delete', {order: order});

        }

    } catch (error) {
        res.status(401).json({
            status: 'error',
            error: error.message
        })
    }
}

exports.getOrderByDate = async(req, res, next) => {
    try {
        let date = req.params.date;
        let inputDate = new Date(date);
        
        const order = await PlacedOrder.find({createdAt:  {$gte: inputDate}, isDelivered: false }).populate("userId productId boyId");
        if(order){
            res.status(200).json({status: true, message: 'Order Fetched', order});
            io.getIO().emit('getOrderByDate:get', {order: order});

        }
    } catch (error) {
        res.status(401).json({
            status: 'error',
            error: error.message
        })
    }
}


exports.getAllOrders = async(req, res, next) => {
    try {
        const order = await PlacedOrder.find({isDelivered: false}).populate('productId userId boyId');

        if(order){
            res.status(200).json({status: 'success', message: 'Order Fetched Successfully', length: order.length, order})
            io.getIO().emit('placeorder:get', {order: order});
        
        }
        
    } catch (error) {
        res.status(401).json({
            status: 'error',
            error: error.message
        })
    }
}
exports.getOrder = async(req, res, next) =>
{
    try {
        const id = req.params.orderId;

        const order = await PlacedOrder.find({_id: id, isDelivered: false}).populate('productId userId boyId');
        if(order){
            res.status(200).json({
                order,
                status: true,
                message: 'Found Order'
            })
            io.getIO().emit('getAllPlaceOrder:get', {order: order});

        }
    } catch (error) {
        res.status(401).json({
            status: 'error',
            error: error.message
        })
    }
}

exports.getOrderByUser = async(req, res, next) => {
    try {
        const userId = req.params.userId;

        PlacedOrder.find({ userId: userId, isDelivered: false})
        .sort({createdAt: -1})
        .populate({ path: 'userId productId slot', populate:{
            path: 'quantity'
        }})
        .then((order) => {
            if(order){
                res.status(200).json({
                    status: 'success',
                    order: order
                })
                
            io.getIO().emit('getPlaceOrderByUser:get', {order: order});

            }
        })
    } catch (error) {
        res.status(401).json({
            status: 'error',
            error: error.message
        })
    }
}
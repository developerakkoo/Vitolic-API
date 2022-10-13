const Cart = require('../Models/orderModel');
const io = require('../socket');
const User = require('../Models/userModel');
const Subscription = require('../Models/subscriptionModel');
const Address = require('../Models/addressModel');
const Product = require('../Models/productModel');
const Bill = require('../Models/billingModel');
const { customAlphabet } = require('nanoid/async')
const nanoid = customAlphabet('1234567890', 6);
const moment = require('moment/moment');
const { endDate } = require('./subscriptionController');


exports.getCartByCartId = async (req, res, next) => {
    try {

        const cart = await Cart.findById(req.params.id).populate("userId address subscription");

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

        const cart = await Cart.find({ userId: req.params.id }).sort({ createdAt: -1 }).populate("userId address subscription");

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

exports.getCart = async (req, res, next) => {
    try {

        const cart = await Cart.find({}).sort({ createdAt: -1 }).populate("userId address subscription");

        //let { isDelivered } = cart;
        //console.log(isDelivered)
        //let isDelivered = cart.isDelivered
        for (i = 0; i < cart.length; i++) {

            if (cart[i].isDelivered == false) {

                res.status(200).json({
                    status: true,
                    count: cart.length,

                    cart
                })
            }
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
        const { userId, products, productId, total, status, address, isCustom, isNormal, isAlternate, startDate, endDate, days, count, name, daysRemaining } = req.body;

        console.log("ADD TO CART METHOD");
        //Order Created
        let cart = new Cart({
            orderId: await nanoid(),
            products: products,
            userId: userId,
            total: total,
            status: status,
            address: address,
        });
        await cart.save();

        let cartId = cart._id
        console.log(cartId)

        if (cart) {
            //Bill Created
            let bill = new Bill({
                invoiceNumber: await nanoid(),
                products: products,
                userId: userId,
                cartId: cartId,
                amount: total,
                paymentStatus: status,

            });
            await bill.save()
            let billId = bill._id;

            let subscription;
            let deliveryFrequency;
            //2.  Create Sub here
            if (isNormal) {
                deliveryFrequency = 'DAILY';
                subscription = new Subscription({
                    productId: productId,
                    userId: userId,
                    cartId: cartId,
                    billId: billId,
                    startDate: startDate,
                    daysRemaining: daysRemaining,
                    endDate: moment(startDate).add(30, 'd').toDate().toISOString(),
                    deliveryFrequency: deliveryFrequency,
                });
                await subscription.save();
            }

            if (isAlternate) {
                deliveryFrequency = 'ALTERNATE';

                subscription = new Subscription({
                    productId: productId,
                    userId: userId,
                    cartId: cartId,
                    billId: billId,
                    startDate: startDate,
                    endDate: endDate,
                    deliveryFrequency: deliveryFrequency,
                });
                await subscription.save();
            }

            if (isCustom) {
                deliveryFrequency = 'CUSTOM';

                subscription = new Subscription({
                    productId: productId,
                    userId: userId,
                    cartId: cartId,
                    billId: billId,
                    days: days,
                    //days: ,
                    //name: name,
                    startDate: startDate,
                    endDate: endDate,
                    deliveryFrequency: deliveryFrequency,
                });

                await subscription.save();
            }

            let subscriptionId = subscription._id;
            //console.log(subscription1)


            /* .then((bill) => {
                bill = Bill.findOneAndUpdate({_id:billId}, { subscriptionId: subscriptionId })
            }) */


            /* let subscription1 = Subscription.findByIdAndUpdate(subscriptionId, { billId: billId, cartId: cartId })
            console.log("hello " + billId, cartId)
            console.log(subscription1);
 */
            /* .then((cart) => {
                cart = Cart.findByIdAndUpdate(cartId, { subscription: subscriptionId, billId: billId })
                console.log(billId,subscriptionId)
            }) */

            if (subscription) {
                res.status(200).json({
                    cart,
                    bill,
                    subscription,
                    message: 'Cart added successfully'
                })
            }
            /* .subscription.findOneAndUpdate({ userId: userId }, { billId: bill._id }, { cartId: cart._id })
             .then().Bill.findOneAndUpdate({ userId: userId }, { subscriptionId: subscription._id, orderId: cart._id })
             .then().Cart.findOneAndUpdate({ userId: userId }, { subscription: subscription._id }) */


            /* let billid = await Bill.find({userId});
             let {_id}= billid
            _id = await Bill._id;
            console.log(_id) */


            /* res.status(200).json({
                cart,
                bill,
                subscription,
                message: 'Cart added successfully'
            }) */


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

exports.orderDelivered = async (req, res, next) => {
    try {
        const cartId = req.params.id
        const cart = await Cart.findById({ _id: cartId });

        let isDelivered = true;
        const cart1 = await Cart.findOneAndUpdate({ _id: cartId }, isDelivered, { $inc: { amount: -1 } });
        const subscription = await Subscription.findOneAndUpdate({ cartId: cartId }, { $inc: { daysRemaining: -1 } })

        if (cart1) {
            res.status(200).json({
                message: 'Order Delivered',
                cart1,
                subscription
            })
            io.getIO().emit('order:delivered', cartId);

        }
    } catch (error) {
        res.status(500).json({ error, message: 'Something went wrong!' })

    }
}

exports.orderStatus = async (req, res, next) => {
    try {
        const cartId = req.params.id
        const cart = await Cart.findById({ _id: cartId });
        //let delivered= await
        cart = await cart.updateOne(isDelivered, { isDelivered: true });
        console.log(cart);

        /* let user = await User.findById(id);

        let subEndDate = await user.isMonth ? moment().add(30, 'd').toDate() : moment().add(60, 'd').toDate();
    
        user = await user.updateOne({ endDate: subEndDate }); */
        if (cart) {

            res.status(200).json({

                cart
            })
            io.getIO().emit('status:Order delivered', cartId);

        }
    } catch (error) {
        res.status(500).json({ error, message: 'Something went wrong!' })

    }
}


exports.featured = async (req, res, next) => {
    try {

        const cart = await Cart.find();

        if (cart) {
            Cart.aggregate([{ $match: {} },
            {
                "$unwind": "$products"
            },
            {
                "$group": {
                    "_id": "$products._id",
                    "image": {
                        "$first": "$products.imageUrl"
                    },
                    "title": {
                        "$first": "$products.title"
                    },
                    "totalOrdered": {
                        "$sum": "$products.amount"
                    }
                }
            },
            {
                "$sort": {
                    totalOrdered: -1
                }
            },



            ]).then(result =>
                res.status(200).json({
                    status: true,
                    result
                }));
        }

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error
        })
    }
}


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
        const { userId, products, productId, total, status, address, isCustom, isNormal, isAlternate, startDate, endDate, days, count, name, daysRemaining, isOneTime } = req.body;
        let noofdays = [];
        if (days != null) noofdays = days.split(",")

        console.log(noofdays.length)
        let normaldays = [];

        let carts = [];
        console.log(noofdays)
        //console.log(normaldays.length)

        console.log("ADD TO CART METHOD");
        console.log(isCustom)
        if (isCustom) {
            for (i = 0; i < noofdays.length; i++) {
                //Order Created
                let cart = new Cart({
                    orderId: await nanoid(),
                    products: products,
                    userId: userId,
                    date: noofdays[i],
                    total: total,
                    status: status,
                    address: address,
                });
                await cart.save();

                let cartId = cart._id
                carts.push(cartId);
                console.log(cartId)

            }
            console.log(noofdays.length)
        }
        else if (isNormal || isAlternate) {
            for (var m = moment(startDate); m.isSameOrBefore(endDate); m.add(1, 'days')) {
                normaldays.push(m.format('DD-MM-YYYY'));
            }
            for (j = 0; j < normaldays.length; j++) {

                //for (i = 0; i < noofdays.length; i++){
                //Order Created
                let cart = new Cart({
                    orderId: await nanoid(),
                    products: products,
                    userId: userId,
                    date: normaldays[j],
                    total: total,
                    status: status,
                    address: address,
                });
                await cart.save();

                let cartId = cart._id
                carts.push(cartId);
                console.log(cartId)

                // }
            }
        }
        //console.log(carts.length)

        else if (isOneTime) {

            //Order Created
            let cart = new Cart({
                orderId: await nanoid(),
                products: products,
                userId: userId,
                date: moment().toISOString(),
                total: total,
                status: status,
                address: address,
            });
            await cart.save();
            const user = await User.findByIdAndUpdate(userId, { $inc: { walletCashbackAvailable: total } });

            res.status(200).json({
                cart,
                message: 'Cart added successfully'
            })
            let cartId = cart._id
            carts.push(cartId);
            console.log(cartId)

        }
        if (carts) {
            //Bill Created
            let bill = new Bill({
                invoiceNumber: await nanoid(),
                products: products,
                userId: userId,
                cartId: carts,
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
                    cartId: carts,
                    billId: billId,
                    startDate: startDate,
                    daysRemaining: daysRemaining,
                    endDate: moment(startDate).add(30, 'd').toDate().toISOString(),
                    days:normaldays,
                    deliveryFrequency: deliveryFrequency,
                });
                await subscription.save();
            }

            if (isAlternate) {
                deliveryFrequency = 'ALTERNATE';

                subscription = new Subscription({
                    productId: productId,
                    userId: userId,
                    cartId: carts,
                    billId: billId,
                    startDate: startDate,
                    endDate: endDate,
                    days:normaldays,
                    deliveryFrequency: deliveryFrequency,
                });
                await subscription.save();
            }

            if (isCustom) {
                deliveryFrequency = 'CUSTOM';

                subscription = new Subscription({
                    productId: productId,
                    userId: userId,
                    cartId: carts,
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

            const user = await Subscription.findByIdAndUpdate(subscriptionId, { $inc: { subscriptionWallet: total } });

            if (subscription) {
                res.status(200).json({
                    carts,
                    bill,
                    subscription,
                    message: 'Cart added successfully'
                })
            }
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
        const cartId = req.params.id;
        const userId = req.body.userId;
        const cart = await Cart.findById({ _id: cartId });
        const price = req.body.price;
        let isDelivered = true;

        const user = await User.findByIdAndUpdate(userId, { $inc: { walletCashbackAvailable: -price } });
        console.log(cart.products[0])
        const cart1 = await Cart.findByIdAndUpdate({ _id: cartId }, { isDelivered });
        const subscription = await Subscription.findOneAndUpdate({ cartId: cartId }, { $inc: { daysRemaining: -1 } })

        if (cart1) {
            res.status(200).json({
                message: 'Order Delivered',
                cart1,
                subscription, user
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


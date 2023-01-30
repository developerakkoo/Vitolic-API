const Cart = require('../Models/orderModel');
const SubCart = require('../Models/subOrderModel');
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

exports.getCartForDeliveryAgrregate = async (req, res, next) => {
    try {
        let today  = req.params.today;
        let pincode = req.params.pincode;
        
        const result=await Cart.find({address})

        res.status(200).json({ result })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error
        })
    }

}
exports.getCartForDeliveryToday = async (req, res, next) => {
    try {
        let today = req.params.today;
        const cart = await Cart.find({
            terminate: false,
            isPause: false,
            orderDays: { $in: today }


        }).populate("userId address subscription");

        if (cart) {
            io.getIO().emit('cart:get', cart);
            res.status(200).json({
                status: true,
                count: cart.length,
                date: new Date(today).toISOString(),
                cart
            })
        } else {
            res.status(400).json({
                status: false,
                message: "No Order found for today"
            })
        }

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error
        })
    }

}
exports.getCartByDate = async (req, res, next) => {
    try {
        let { startDate, endDate, } = req.body;

        let nextDay = moment().add(1, 'd').format('DD-MM-YYYY');
        console.log(nextDay)
        const cart = await Cart.find({
            $and: [
                {
                    createdAt: {
                        $gte: new Date(startDate).toISOString(),
                        // $lte:  new Date(endDate).toISOString()
                    }
                },
                {
                    createdAt: {
                        $lte: new Date(endDate).toISOString()
                    }
                }
            ]
        }).populate("userId address subscription");

        if (cart) {
            io.getIO().emit('cart:get', cart);
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

exports.getCartByType = async (req, res, next) => {
    try {
        let { type } = req.body;

        const cart = await Cart.find({
            type: type
        }).populate("userId address subscription");

        if (cart) {
            io.getIO().emit('cart:get', cart);
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

exports.getCartByCartId = async (req, res, next) => {
    try {

        const cart = await Cart.findById(req.params.id).populate("userId address subscription billId product");
        if (cart) {
            io.getIO().emit('cart:get', cart);

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

        const cart = await Cart.find({ userId: req.params.id, terminate: false, mainOrderId: null }).sort({ createdAt: -1 }).populate("userId address subscription");

        if (cart) {
            io.getIO().emit('cart:get', cart);

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
exports.getCartTerminated = async (req, res, next) => {
    try {

        const cart = await Cart.find({ terminate: true }).sort({ createdAt: -1 }).populate("userId address subscription");

        io.getIO().emit('cart:get', cart);

        res.status(200).json({
            status: true,
            count: cart.length,

            cart
        })

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error
        })
    }

}
exports.getCartPaused = async (req, res, next) => {
    try {

        const cart = await Cart.find({ isPause: true }).sort({ createdAt: -1 }).populate("userId address subscription");
        io.getIO().emit('cart:get', cart);

        res.status(200).json({
            status: true,
            count: cart.length,

            cart
        })

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error
        })
    }

}
exports.getCartFilter = async (req, res, next) => {

    try {
        const query = req.query.query;
        const term = req.query.term;

        console.log(query + term);
        const features = await new APIFeatures(Cart.find().populate('quantity'), req.query)
            .filter()
            .sort()

        const carts = await features.query;

        res.status(200).json({
            status: "success",
            statusCode: 200,
            results: products.length,
            carts,
        });

        io.getIO().emit('cart:get', { carts });


    } catch (err) {
        next(new AppError(err.message, 401));
    }
};

exports.getCart = async (req, res, next) => {
    try {

        const cart = await Cart.find({ isDelivered: false }).sort({ createdAt: -1 }).populate("userId address subscription");
        io.getIO().emit('cart:get', cart);

        res.status(200).json({
            status: true,
            count: cart.length,

            cart
        })

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error
        })
    }

}

exports.addToCart = async (req, res, next) => {
    try {
        let { userId, products, productId, total, status, deliveryFrequency, address, pincode,
            emailAddress, mobileNumber, isCustom,
            isNormal, isAlternate, startDate, endDate,
            days, daysRemaining, isOneTime, deliveryQuantity, discountedPrice } = req.body;
        /*   let noofdays = [];
          if (days != null) noofdays = days.split(",") */
        const product = await Product.findById(productId);
        // startDate = moment(startDate).format('YYYY-MM-DD');
        // endDate = moment(endDate).format('YYYY-MM-DD');
        // console.log(endDate)
        //console.log(noofdays.length)
        let normaldays = [];
        let altDays;

        let productPrice = product.discountedPrice;
        console.log(productPrice)
        let productImgUrl = product.imageUrl;
        console.log(productImgUrl)
        let cartId;

        console.log("ADD TO CART METHOD");
        console.log(isCustom)
        if (isCustom) {
            //for (i = 0; i < days.length; i++) {
            //Order Created
            let cart = new Cart({
                orderId: await nanoid(),
                products: products,
                userId: userId,
                //orderDate: days,
                orderDays: days,
                //quantity: quantity,
                startDate: startDate,
                endDate: endDate,
                total: total,
                status: status,
                address: address,
                pincode: pincode,
                type: "Custom"
            });
            await cart.save();

            //use cron job to create next order automatically

            cartId = cart._id
            /* carts.push(cartId);
            console.log(cartId) */

            //}
            console.log(days.length)
        }
        else if (isNormal) {
            for (var m = moment(startDate); m.isSameOrBefore(endDate); m.add(1, 'days')) {
                normaldays.push(m.format('YYYY-MM-DD'));
            }
            console.log(normaldays + "days")
            //for (j = 0; j < normaldays.length; j++) {
            console.log(normaldays.length)

            //for (i = 0; i < noofdays.length; i++){
            //Order Created
            let cart = new Cart({
                orderId: await nanoid(),
                products: products,
                userId: userId,
                //orderDate: normaldays[j],
                orderDays: normaldays,
                //quantity: quantity,
                startDate: startDate,
                endDate: endDate,
                total: total,
                status: status,
                address: address,
                pincode: pincode,

                type: "Daily"

            });
            await cart.save();

            cartId = cart._id
            /* carts.push(cartId);
            console.log(cartId) */

        }
        //}
        // }
        //console.log(carts.length)
        else if (isAlternate) {
            console.log(startDate + "datestart")
            console.log(isAlternate)
            for (var m = moment(startDate); m.isSameOrBefore(endDate); m.add(1, 'days')) {
                normaldays.push(m.format('YYYY-MM-DD'));
            }
            console.log(normaldays + " days")
            console.log(normaldays.length)
            //console.log

            altDays = normaldays.filter(function (v, i) {
                // check the index is odd
                return i % 2 == 0;
            });

            console.log(altDays);
            //for (j = 0; j < normaldays.length; j++) {

            console.log(altDays.length + "alternatedays")
            //for (i = 0; i < noofdays.length; i++){
            //Order Created
            let cart = new Cart({
                orderId: await nanoid(),
                products: products,
                userId: userId,
                //orderDate: normaldays[j],
                orderDays: altDays,
                //quantity: quantity,
                startDate: startDate,
                endDate: endDate,
                total: total,
                status: status,
                pincode: pincode,
                address: address,
                type: "Alternate"

            });
            await cart.save();

            cartId = cart._id
            /* carts.push(cartId);
            console.log(cartId) */

        }
        else if (isOneTime) {

            //Order Created
            let cart = new Cart({
                orderId: await nanoid(),
                products: products,
                productId: productId,
                userId: userId,
                startDate: startDate,
                endDate: endDate,
                //quantity: quantity,
                total: total,
                pincode: pincode,
                status: status,
                address: address,
                type: "One Time"
            });
            await cart.save();
            const user = await User.findByIdAndUpdate(userId, { $inc: { walletCashbackAvailable: total } });

            res.status(200).json({
                message: 'Cart added successfully',
                cart,
                user,
            })
            cartId = cart._id
            /* carts.push(cartId);
            console.log(cartId) */

        }
        if (cartId) {
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
                    //quantity: quantity,
                    deliveryQuantity: deliveryQuantity,
                    discountedPrice: discountedPrice,
                    imageUrl: productImgUrl,
                    userId: userId,
                    cartId: cartId,
                    billId: billId,
                    addressId: address,
                    mobileNumber: mobileNumber,
                    emailAddress: emailAddress,
                    startDate: startDate,
                    daysRemaining: daysRemaining,
                    endDate: endDate,
                    days: normaldays,
                    deliveryFrequency: deliveryFrequency,
                });
                await subscription.save();
            }

            if (isAlternate) {
                deliveryFrequency = 'ALTERNATE';

                subscription = new Subscription({
                    productId: productId,
                    //quantity:quantity,
                    deliveryQuantity: deliveryQuantity,
                    discountedPrice: discountedPrice,
                    imageUrl: productImgUrl,
                    userId: userId,
                    cartId: cartId,
                    billId: billId,
                    addressId: address,
                    mobileNumber: mobileNumber,
                    emailAddress: emailAddress,
                    startDate: startDate,
                    endDate: endDate,
                    days: altDays,
                    daysRemaining: daysRemaining,

                    deliveryFrequency: deliveryFrequency,
                });
                await subscription.save();
            }

            if (isCustom) {
                deliveryFrequency = 'CUSTOM';

                subscription = new Subscription({
                    productId: productId,
                    //quantity:quantity,
                    deliveryQuantity: deliveryQuantity,
                    discountedPrice: discountedPrice,
                    imageUrl: productImgUrl,
                    userId: userId,
                    cartId: cartId,
                    billId: billId,
                    daysRemaining: daysRemaining,

                    addressId: address,
                    mobileNumber: mobileNumber,
                    emailAddress: emailAddress,
                    days: days,
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
                    cartId,
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
exports.addOrder = async (req, res, next) => {
    try {
        const id = req.params.id
        const cart = await Cart.findById(id);
        let subscription = await Subscription.find({ cartId: id }); // To get bill Id and subscription Id for Sub orders.
        let pincode = cart.pincode;
        let orderId = cart.orderId;
        let days = cart.orderDays;
        let userId = cart.userId;
        let products = cart.products;
        let total = cart.total;
        let address = cart.address;
        let billId = subscription[0].billId;
        let subscriptionId = subscription[0]._id;
        let currentDate = moment().format('YYYY-MM-DD')
        console.log(currentDate)
        let terminate = cart.terminate;
        let pause = cart.isPause;
        if (terminate == false && pause == false) {
            for (i = 0; i < days.length; i++) {
                //if (days[i] == currentDate) {
                //Order Created
                let cart = new SubCart({
                    orderId,
                    products: products,
                    userId: userId,
                    pincode: pincode,
                    orderDate: days[i],
                    total: total,
                    address: address,
                    mainOrderId: id,
                    billId: billId,
                    subscription: subscriptionId,
                });
                await cart.save();
                //use cron job to create next order automatically
                // }
            }

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
            io.getIO().emit('cart:get', cart);

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
        let subcart = await SubCart.deleteMany({ mainOrderId: id });
        if (cart) {
            io.getIO().emit('cart:get', cart);

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
        const price = req.body.price;
        const today = req.body.today;
        //change walletcashbackavailable to subscriptionwallet
        //  const user = await User.findByIdAndUpdate(userId, { $inc: { walletCashbackAvailable: -price } });
        Subscription.findOne({ cartId: cartId }, (err, doc) => {
            if (err) {
                res.status(500).json({
                    message: err
                })
            } else if (doc) {

                var records = { 'days': doc };
                let idx = doc.days.indexOf(today);
                if (idx !== -1) {
                    doc.days.splice(idx, 1);
                    doc.subscriptionWallet -= price;
                    // save the doc
                    doc.save(function (error) {
                        if (error) {
                            console.log(error);
                            res.status(500).json({ error });
                        } else {
                            // send the records
                            res.status(200).json({ records });
                        }
                    });
                } else if (idx == -1) {
                    res.status(500).json({
                        message: "No date found",
                        status: false
                    })
                }
            }

        });

    } catch (error) {
        res.status(500).json({ error, message: 'Something went wrong!' })

    }
}

exports.orderStatus = async (req, res, next) => {
    try {
        const cartId = req.params.id;

        const cart = await SubCart.findByIdAndUpdate(cartId, { isDelivered: true });

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


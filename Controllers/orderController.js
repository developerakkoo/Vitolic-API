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

exports.getCartByDate = async (req, res, next) => {
    try {
        let nextDay = moment().add(1, 'd').format('DD-MM-YYYY');
        console.log(nextDay)
        const cart = await Cart.find({ date: nextDay }).sort({ createdAt: -1 }).populate("userId address subscription");

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

/* exports.getCartByDate = async (req, res, next) => {
    try {
        let nextDay=moment().add(1,'d').format('DD-MM-YYYY');
        console.log(nextDay)
        const cart = await Cart.find({date:nextDay}).sort({ createdAt: -1 }).populate("userId address subscription");

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

} */

exports.getCartByCartId = async (req, res, next) => {
    try {

        const cart = await Cart.findById(req.params.id).populate("userId address subscription product");

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

        const cart = await Cart.find({ isDelivered: false }).sort({ createdAt: -1 }).populate("userId address subscription");

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
        let { userId, products, productId, total, status, address, emailAddress, mobileNumber, isCustom, isNormal, isAlternate, startDate, days, daysRemaining, isOneTime, deliveryQuantity } = req.body;
        /*   let noofdays = [];
          if (days != null) noofdays = days.split(",") */
        const product = await Product.findById(productId);
        startDate = moment(startDate).format('YYYY-MM-DD')
        let endDate = moment(startDate).add(29, 'd')
        console.log(endDate)
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
                total: total,
                status: status,
                address: address,
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
                total: total,
                status: status,
                address: address,
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
  
             altDays = normaldays.filter(function(v, i) {
                // check the index is odd
                return i % 2 == 0;
              });
              
              console.log(altDays);
            //for (j = 0; j < normaldays.length; j++) {

            console.log(altDays.length+"alternatedays")
            //for (i = 0; i < noofdays.length; i++){
            //Order Created
            let cart = new Cart({
                orderId: await nanoid(),
                products: products,
                userId: userId,
                //orderDate: normaldays[j],
                orderDays: altDays,
                //quantity: quantity,
                total: total,
                status: status,
                address: address,
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
                userId: userId,
                orderDate: moment().format('YYYY-MM-DD'),
                //quantity: quantity,
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
                    deliveryQuantity:deliveryQuantity,
                    discountedPrice: productPrice,
                    imageUrl: productImgUrl,
                    userId: userId,
                    cartId: cartId,
                    billId: billId,
                    addressId: address,
                    mobileNumber: mobileNumber,
                    emailAddress: emailAddress,
                    startDate: startDate,
                    daysRemaining: daysRemaining,
                    endDate: moment(startDate).add(30, 'd').toDate().toISOString(),
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
                    deliveryQuantity:deliveryQuantity,
                    discountedPrice: productPrice,
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
                    deliveryFrequency: deliveryFrequency,
                });
                await subscription.save();
            }

            if (isCustom) {
                deliveryFrequency = 'CUSTOM';

                subscription = new Subscription({
                    productId: productId,
                    //quantity:quantity,
                    deliveryQuantity:deliveryQuantity,
                    discountedPrice: productPrice,
                    imageUrl: productImgUrl,
                    userId: userId,
                    cartId: cartId,
                    billId: billId,
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
        console.log("hello")
        const id = req.params.id
        const cart = await Cart.findById(id);
        let days = cart.orderDays;
        let userId = cart.userId;
        let products = cart.products;
        let total = cart.total;
        let address = cart.address;
        let currentDate = moment().format('YYYY-MM-DD')
        console.log(currentDate)
        let terminate = cart.terminate;
        let pause = cart.isPause;
        if (terminate == false && pause == false) {
            for (i = 0; i < days.length; i++) {
                //if (days[i] == currentDate) {
                //Order Created
                let cart = new Cart({
                    orderId: await nanoid(),
                    products: products,
                    userId: userId,
                    orderDate: days[i],
                    total: total,
                    address: address,
                    mainOrderId: id
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

        //change walletcashbackavailable to subscriptionwallet
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


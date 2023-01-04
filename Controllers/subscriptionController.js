const Subscription = require('../Models/subscriptionModel');
const User = require('../Models/userModel');
const Bill = require('../Models/billingModel');
const Product = require('../Models/productModel');

const { customAlphabet } = require('nanoid/async')
const nanoid = customAlphabet('1234567890', 6);
const io = require('../socket');
var moment = require('moment');
const Cart = require('../Models/orderModel');

exports.postSubscription = async (req, res, next) => {

    const orderId = await nanoid();
    const userId = req.body.userId;
    const invoiceNumber = req.body.invoiceNumber;
    const milk = req.body.milk;
    const phone = req.body.phone;
    const emailId = req.body.emailId;
    const address = req.body.address;
    const deliveryFrequency = req.body.deliveryFrequency;


    const subscription = new Subscription({
        userId,
        invoiceNumber,
        orderId,
        milk,
        phone,
        emailId,
        address,
        deliveryFrequency,
    });


    subscription.save().then((result) => {
        console.log("Subscription Created!");

        res.status(201).json({
            result,
            message: "Subscription Created",
        });
        io.getIO().emit('subscription:create', { action: 'created', subscription })

        if (subscription) {
            let bill = new Bill({
                products: milk,
                userId: userId,
                subscriptionId: invoiceNumber,
                orderId: orderId,
                //total: total,
                //status: status,
            });

            bill.save();

            if (bill) {
                res.status(200).json({
                    bill,
                    message: 'bill added successfully'
                })
            }
        }

    }).catch((err) => {
        res.status(500).json({
            status: false,
            message: err.message
        })
    })
}



exports.getSubscription = async (req, res, next) => {
    try {

        let subscription = await Subscription.find({}).sort({ createdAt: -1 });
        if (subscription) {
            io.getIO().emit('subscription:get', { action: 'get', subscription })


            res.status(200).json(subscription )
        }
    } catch (error) {
        res.status(500).json({ message: error.message, devMessage: "Something went wrong!" });
    }
}

exports.getSubscriptionByCartId = async (req, res, next) => {
    try {
        const id = req.params.id;

        let subscription = await Subscription.find({ cartId: id }).populate('userId billId cartId ');
        if (subscription) {
            io.getIO().emit('subscription:get', { action: 'get', subscription })

            res.status(200).json(subscription )
        }
    } catch (error) {
        res.status(500).json({ message: error.message, devMessage: "Something went wrong!" });
    }
}

exports.getSubscriptionById = async (req, res, next) => {
    try {
        const id = req.params.id;

        const subscription = await Subscription.findById(id).populate('productId userId billId cartId');

        if (subscription) {
            io.getIO().emit('subscription:get',subscription )

            res.status(200).json({ success: true, subscription })
        }
    } catch (error) {
        res.status(500).json({ message: error.message, devMessage: "Something went wrong!" });
    }
}

exports.getSubscriptionByUserId = async (req, res, next) => {
    try {
        const id = req.params.id;

        const subscription = await Subscription.find({ userId: id, terminate: false }).sort({ createdAt: -1 }).populate('productId userId cartId billId');

        if (subscription) {
            io.getIO().emit('subscription:get', subscription )

            res.status(200).json({ success: true, subscription })
        }
    } catch (error) {
        res.status(500).json({ message: error.message, devMessage: "Something went wrong!" });
    }
}


exports.getSubscriptionByType = async (req, res, next) => {
    try {
        const freq = req.params.id;

        const subscription = await Subscription.find({ deliveryFrequency: freq, terminate: false }).sort({ createdAt: -1 }).populate('productId userId cartId billId');

        if (subscription) {
            io.getIO().emit('subscription:get', subscription )

            res.status(200).json({ success: true, subscription })
        }
    } catch (error) {
        res.status(500).json({ message: error.message, devMessage: "Something went wrong!" });
    }
}

exports.updateSubscription = async (req, res, next) => {
    try {
        const id = req.params.id;
        let subscription = await Subscription.findByIdAndUpdate(id, req.body);

        if (subscription) {
            io.getIO().emit('subscription:get',subscription );

            res.status(200).json({ success: true, message: 'Subscription updated successfully', subscription })
        }
    } catch (error) {
        res.status(500).json({ message: error.message, devMessage: "Something went wrong!" });
    }
}

exports.deleteSubscription = async (req, res, next) => {
    try {

        const id = req.params.id;

        const subscription = await Subscription.findOneAndDelete(id);

        if (subscription) {
            io.getIO().emit('subscription:get',subscription );


            res.status(200).json({ status: true, message: 'Subscription deleted successfully', subscription: subscription })
        }
    } catch (error) {
        res.status(404).json({ status: false, error: error, message: error.message });
    }
}


exports.addSubscription = async (req, res, next) => {
    try {
        const id = req.params.id;
        const isMonth = req.body.isMonth;
        const isAlternate = req.body.isAlternate;
        //const startDate = moment().toDate().toISOString();
        let startDate = req.body.startDate;
        //const endDate = moment(startDate).format('YYYY/MM/DD').add(30, 'd').toDate().toISOString();

        const user = await User.findOneAndUpdate({ _id: id }, { isMonth, isAlternate, startDate });

        if (user) {

            res.status(201).json({ status: 'success', user: { isMonth, isAlternate, startDate }, message: 'Profile updated successfully!' });

            let bill = new Bill({
                products: products,
                userId: id,
                //subscriptionId: subscriptionId,
                total: total,
                //status: status,
            });

            await bill.save();

            if (bill) {
                res.status(200).json({
                    bill,
                    message: 'bill added successfully'
                })
            }
        }


    } catch (error) {
        res.status(500).json({ error, message: 'Something went wrong!' });
    }
};

exports.endDate = async (req, res, next) => {
    try {
        const id = req.params.id;

        let user = await User.findById(id);

        let subEndDate = await user.isMonth ? moment().format('YYYY/MM/DD').add(30, 'd').toDate().toISOString() : moment().format('YYYY/MM/DD').add(30, 'd').toDate().toISOString();

        user = await user.updateOne({ endDate: subEndDate });

        if (user) {
            res.status(201).json({ status: 'success', user: user, message: 'Profile updated successfully!' });
        }

    } catch (error) {
        res.status(500).json({ error, message: 'Something went wrong!' });
    }
}


//Custom Date
/* exports.customDate = async (req, res, next) => {
    try {
        const id = req.params.id;

        const user = await User.findById(id).populate('products');

        let { startDate, endDate } = user;

        function getDates(startDate, stopDate) {
            var dateArray = [];
            var currentDate = moment(startDate);
            var stopDate = moment(stopDate);
            while (currentDate <= stopDate) {
                dateArray.push(moment(currentDate).format('YYYY-MM-DD'))
                currentDate = moment(currentDate).add(1, 'days');
            }
            return dateArray;
        }
        const dates = getDates(startDate, endDate);
        console.log(dates);

    } catch (error) {
        res.status(500).json({ error, message: 'Something went wrong!' });
    }
} */



//Weekdays
exports.customDate2 = async (req, res, next) => {
    try {
        const id = req.params.id;

        let sunday = req.body.sunday;
        let monday = req.body.monday;
        let tuesday = req.body.tuesday;
        let wednesday = req.body.wednesday;
        let thursday = req.body.thursday;
        let friday = req.body.friday;
        let saturday = req.body.saturday;

        const startDate = req.body.startDate;
        const endDate = moment(startDate).format('YYYY/MM/DD').add(30, 'd').toDate();
        //const endDate = moment(startDate).add(30, 'd').toDate().toISOString();


        const totalDays = parseInt(sunday) + parseInt(monday) + parseInt(tuesday) + parseInt(wednesday) + parseInt(thursday) + parseInt(friday) + parseInt(saturday);
        console.log(totalDays)

        const user = await User.findOneAndUpdate({ _id: id }, { endDate }, req.body);

        //console.log(dateArray)
        //console.log(dateArray.length);
        if (user) {
            res.status(201).json({ status: 'success', totalDays, user, message: 'Dates updated successfully!' });

        }

    } catch (error) {
        res.status(500).json({ error, message: 'Something went wrong!' });
    }
}

exports.pause = async (req, res, next) => {
    try {
        const id = req.params.id;
        const isActive = req.body.isActive;
        var now = moment(new Date()); //todays date
        var end = moment("2022-12-1"); // another date
        var duration = moment.duration(now.diff(end));
        var days = duration.asDays();
        console.log(days)
        if (isActive == false) {
            //pauseDate = new Date(Date.now()).toISOString().split("T")[0]
            let pauseDate = moment().toISOString().split("T")[0];
            //let endDate = moment().add(20, 'd').toISOString().split("T")[0]
            console.log(pauseDate)
            const subscription = await Subscription.findByIdAndUpdate(id, { isActive, pauseDate: moment().toISOString().split("T")[0] });
            res.status(201).json({ status: 'success', subscription, message: 'Subscription paused successfully!' });
            io.getIO().emit('subscription:get',subscription );

        }

        else if (isActive == true) {
            //resumeDate = new Date('2022-10-30').toISOString().split("T")[0];
            let resumeDate = moment().add(2, 'd')
            console.log(resumeDate)
            const subscription = await Subscription.findByIdAndUpdate(id, { isActive, resumeDate: moment().add(2, 'd').toISOString().split("T")[0] });
            let p = subscription.pauseDate;
            console.log(p + "puase")
            const final = resumeDate.diff(p, 'd')
            console.log(final + "hekk")
            let date3 = subscription.endDate
            console.log(date3)
            let endDate = moment(date3).add(final + 1, 'd').toISOString().split("T")[0]
            console.log(endDate)
            const subscription1 = await Subscription.findByIdAndUpdate(id, { endDate: endDate });

            io.getIO().emit('subscription:get',subscription );
            res.status(201).json({ status: 'success', subscription1, message: 'Subscription resumed successfully!' });

        }

    } catch (error) {
        res.status(500).json({ error, message: 'Something went wrong!' });
    }
}


exports.terminate = async (req, res, next) => {
    try {
        const id = req.params.id;
        const terminate = req.body.terminate;
        const userId = req.body.userId;
        const cartId = req.params.cartId;
        console.log("hello")
        let subscription = await Subscription.findByIdAndUpdate(id, req.body);
        let balance = subscription.subscriptionWallet;
        let date = subscription.days;
        let currentDate = moment().format('YYYY-MM-DD');

        for (i = 0; i < date.length; i++) {
            if (currentDate == date[i]) {
                console.log(currentDate + "hi")
            }
        }
        console.log(balance)
        if (terminate) {
            const user = await User.findByIdAndUpdate(userId, { $inc: { walletCashbackAvailable: balance } });
            let subscription = await Subscription.findByIdAndUpdate(id, { subscriptionWallet: 0 });
            let cart = await Cart.findByIdAndUpdate(cartId, {terminate: true});
            io.getIO().emit('subscription:get',subscription );

            res.status(200).json({ status: true, message: 'Subscription terminated successfully', subscription: subscription, user })
        }
    } catch (error) {
        res.status(500).json({ error, message: 'Something went wrong!' });
    }
}

exports.altToDaily = async (req, res, next) => {  //done
    try {
        console.log("hi")
        const id = req.params.id;
        console.log(id)
        let subscriptionOld = await Subscription.findById(id);
        let productId = subscriptionOld.productId;
        console.log(productId);
        const product = await Product.findById(productId);
        let productPrice = product.discountedPrice;
        console.log(productPrice)
        let productImgUrl = product.imageUrl;
        console.log(productImgUrl)
        let oldbillId = subscriptionOld.billId;
        console.log(oldbillId);
        let cartId = subscriptionOld.cartId;
        console.log(cartId);
        let userId = subscriptionOld.userId;
        console.log(userId);
        let subwallet = subscriptionOld.subscriptionWallet;
        // let user = await User.findByIdAndUpdate(userId, { $inc: { walletCashbackAvailable: subwallet } });
        subscriptionOld = await Subscription.findByIdAndDelete(id);
        let bill = await Bill.findByIdAndDelete(oldbillId);
        let upgrade = "ALTERNATE TO DAILY";
        let cart = await Cart.findByIdAndUpdate(cartId, { upgrade });
        let startDate = req.body.startDate;
        startDate = moment(startDate).format('YYYY-MM-DD')
        let endDate = req.body.endDate;
        endDate = moment(endDate).format('YYYY-MM-DD')
        let total = req.body.total;
        let status = req.body.status;
        let address = req.body.address;
        let emailAddress = req.body.emailAddress;
        let mobileNumber = req.body.mobileNumber;
        //let days = req.body.days;
        let daysRemaining = req.body.daysRemaining;
        let deliveryQuantity = req.body.deliveryQuantity;
        let products = req.body.products;
        let newCartId;
        let normaldays = [];
        if (total != 0) {
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

            newCartId = cart._id
            /* carts.push(cartId);
            console.log(cartId) */

        }
        if (newCartId) {
            //Bill Created
            let bill = new Bill({
                invoiceNumber: await nanoid(),
                products: products,
                userId: userId,
                cartId: newCartId,
                amount: total,
                paymentStatus: status,

            });
            await bill.save()
            let billId = bill._id;

            let subscription;
            let deliveryFrequency;
            //2.  Create Sub here
            if (newCartId) {
                deliveryFrequency = 'DAILY';
                subscription = new Subscription({
                    productId: productId,
                    //quantity: quantity,
                    deliveryQuantity: deliveryQuantity,
                    discountedPrice: productPrice,
                    imageUrl: productImgUrl,
                    userId: userId,
                    cartId: newCartId,
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
            let subscriptionId = subscription._id;
            const user = await Subscription.findByIdAndUpdate(subscriptionId, { $inc: { subscriptionWallet: total } });
            if (subscription) {
            io.getIO().emit('subscription:get',subscription );

                res.status(200).json({
                    message: 'Subscription upgraded to DAILY successfully',
                    newCartId,
                    bill,
                    subscription,
                })
            }
        }
        /* 
                const userId = req.body.userId;
                const mainOrderId = req.body.mainOrderId;
                const deliveryFrequency = "DAILY";
                const startDate = req.body.startDate;
                console.log(startDate + "hello")
                const endDate = req.body.endDate;
                let carts = [];
                let normaldays = [];
                //let subscriptionOld = await Subscription.findById(id);
                console.log("subscriptionOld" + "hello")
                let oldDays = []
                oldDays = subscriptionOld.days;
                let price = subscriptionOld.discountedPrice;
                const subscription = await Subscription.findByIdAndUpdate(id, { deliveryFrequency, startDate, endDate });
                //console.log(subscription)
                if (subscription) {
                    let currentDate = moment().add(1, 'd').format('YYYY-MM-DD')
                    console.log(currentDate)
                    let index = oldDays.indexOf(currentDate);
                    const deletedItem = oldDays.splice(index);
                    console.log(deletedItem + deletedItem.length);
                    let transferBalance = deletedItem.length * price;
                    let user = await User.findByIdAndUpdate(id, { inc: { walletCashbackAvailable: transferBalance } })
                    //Delete old orders and create new orders of remaining days
                    const order = await Cart.deleteMany({ mainOrderId: mainOrderId, orderDate: { "$gte": currentDate, "$lte": endDate } })
                    console.log(mainOrderId)
                    console.log("orders deleted")
        
                    const mainOrder = await Cart.findOne({ _id: mainOrderId });
                    console.log(mainOrder)
                    //let days = cart.orderDays;
                    //let userId = cart.userId;
                    let products = mainOrder.products;
                    let total = mainOrder.total;
                    let address = mainOrder.address;
                    let status = mainOrder.status;
        
                    let terminate = mainOrder.terminate;
                    let pause = mainOrder.isPause;
                    if (terminate == false && pause == false) {
                        {
                            for (var m = moment(startDate); m.isSameOrBefore(endDate); m.add(1, 'days')) {
                                normaldays.push(m.format('YYYY-MM-DD'));
                                console.log(normaldays)
                            }
                            for (j = 0; j < normaldays.length; j++) {
                                console.log(normaldays + "in order loop")
        
                                //for (i = 0; i < noofdays.length; i++){
                                //Order Created
                                let cart = new Cart({
                                    orderId: await nanoid(),
                                    products: products,
                                    userId: userId,
                                    orderDate: normaldays[j],
                                    total: total,
                                    mainOrderId,
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
                    }
        
        
                    if (carts) {
                        res.status(201).json({ status: 'success', carts, message: 'Subscription upgraded to daily successfully!' });
                    }
                } */



    } catch (error) {
        res.status(500).json({ error, message: 'Something went wrong!' });
    }
}

exports.altToCustom = async (req, res, next) => { //done
    try {
        console.log("hi")
        const id = req.params.id;
        console.log(id)
        let subscriptionOld = await Subscription.findById(id);
        let productId = subscriptionOld.productId;
        console.log(productId);
        const product = await Product.findById(productId);
        let productPrice = product.discountedPrice;
        console.log(productPrice)
        let productImgUrl = product.imageUrl;
        console.log(productImgUrl)
        let oldbillId = subscriptionOld.billId;
        console.log(oldbillId);
        let cartId = subscriptionOld.cartId;
        console.log(cartId);
        let userId = subscriptionOld.userId;
        console.log(userId);
        let subwallet = subscriptionOld.subscriptionWallet;
        // let user = await User.findByIdAndUpdate(userId, { $inc: { walletCashbackAvailable: subwallet } });
        subscriptionOld = await Subscription.findByIdAndDelete(id);
        let bill = await Bill.findByIdAndDelete(oldbillId);
        let upgrade = "ALTERNATE TO CUSTOM";
        let cart = await Cart.findByIdAndUpdate(cartId, { upgrade: upgrade });
        let startDate = req.body.startDate;
        startDate = moment(startDate).format('YYYY-MM-DD')
        let endDate = req.body.endDate;
        endDate = moment(endDate).format('YYYY-MM-DD')
        let total = req.body.total;
        let days = req.body.days;
        let status = req.body.status;
        let address = req.body.address;
        let emailAddress = req.body.emailAddress;
        let mobileNumber = req.body.mobileNumber;
        //let days = req.body.days;
        let daysRemaining = req.body.daysRemaining;
        let deliveryQuantity = req.body.deliveryQuantity;
        let products = req.body.products;
        let newCartId;
        if (total != 0) {
            let cart = new Cart({
                orderId: await nanoid(),
                products: products,
                userId: userId,
                //orderDate: normaldays[j],
                orderDays: days,
                //quantity: quantity,
                total: total,
                status: status,
                address: address,
            });
            await cart.save();

            newCartId = cart._id
            /* carts.push(cartId);
            console.log(cartId) */

        }
        if (newCartId) {
            //Bill Created
            let bill = new Bill({
                invoiceNumber: await nanoid(),
                products: products,
                userId: userId,
                cartId: newCartId,
                amount: total,
                paymentStatus: status,

            });
            await bill.save()
            let billId = bill._id;

            let subscription;
            let deliveryFrequency;
            //2.  Create Sub here
            if (newCartId) {
                deliveryFrequency = 'CUSTOM';
                subscription = new Subscription({
                    productId: productId,
                    //quantity: quantity,
                    deliveryQuantity: deliveryQuantity,
                    discountedPrice: productPrice,
                    imageUrl: productImgUrl,
                    userId: userId,
                    cartId: newCartId,
                    billId: billId,
                    addressId: address,
                    mobileNumber: mobileNumber,
                    emailAddress: emailAddress,
                    startDate: startDate,
                    daysRemaining: daysRemaining,
                    endDate: endDate,
                    days: days,
                    deliveryFrequency: deliveryFrequency,
                });
                await subscription.save();
            }
            let subscriptionId = subscription._id;
            const user = await Subscription.findByIdAndUpdate(subscriptionId, { $inc: { subscriptionWallet: total } });
            if (subscription) {
            io.getIO().emit('subscription:get',subscription );

                res.status(200).json({
                    message: 'Subscription upgraded to CUSTOM successfully',
                    newCartId,
                    bill,
                    subscription,
                })
            }
        }
    } catch (error) {
        res.status(500).json({ error, message: 'Something went wrong!' });
    }
}

exports.customToDaily = async (req, res, next) => { //done
    try {
        console.log("hi")
        const id = req.params.id;
        console.log(id)
        let subscriptionOld = await Subscription.findById(id);
        let productId = subscriptionOld.productId;
        console.log(productId);
        const product = await Product.findById(productId);
        let productPrice = product.discountedPrice;
        console.log(productPrice)
        let productImgUrl = product.imageUrl;
        console.log(productImgUrl)
        let oldbillId = subscriptionOld.billId;
        console.log(oldbillId);
        let cartId = subscriptionOld.cartId;
        console.log(cartId);
        let userId = subscriptionOld.userId;
        console.log(userId);
        let subwallet = subscriptionOld.subscriptionWallet;
        // let user = await User.findByIdAndUpdate(userId, { $inc: { walletCashbackAvailable: subwallet } });
        subscriptionOld = await Subscription.findByIdAndDelete(id);
        let bill = await Bill.findByIdAndDelete(oldbillId);
        let upgrade = "CUSTOM TO DAILY";
        let cart = await Cart.findByIdAndUpdate(cartId, { upgrade });
        let startDate = req.body.startDate;
        startDate = moment(startDate).format('YYYY-MM-DD')
        let endDate = req.body.endDate;
        endDate = moment(endDate).format('YYYY-MM-DD')
        let total = req.body.total;
        let status = req.body.status;
        let address = req.body.address;
        let emailAddress = req.body.emailAddress;
        let mobileNumber = req.body.mobileNumber;
        //let days = req.body.days;
        let daysRemaining = req.body.daysRemaining;
        let deliveryQuantity = req.body.deliveryQuantity;
        let products = req.body.products;
        let newCartId;
        let normaldays = [];
        if (total != 0) {
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

            newCartId = cart._id
            /* carts.push(cartId);
            console.log(cartId) */

        }
        if (newCartId) {
            //Bill Created
            let bill = new Bill({
                invoiceNumber: await nanoid(),
                products: products,
                userId: userId,
                cartId: newCartId,
                amount: total,
                paymentStatus: status,

            });
            await bill.save()
            let billId = bill._id;

            let subscription;
            let deliveryFrequency;
            //2.  Create Sub here
            if (newCartId) {
                deliveryFrequency = 'DAILY';
                subscription = new Subscription({
                    productId: productId,
                    //quantity: quantity,
                    deliveryQuantity: deliveryQuantity,
                    discountedPrice: productPrice,
                    imageUrl: productImgUrl,
                    userId: userId,
                    cartId: newCartId,
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
            let subscriptionId = subscription._id;
            const user = await Subscription.findByIdAndUpdate(subscriptionId, { $inc: { subscriptionWallet: total } });
            if (subscription) {
            io.getIO().emit('subscription:get',subscription );

                res.status(200).json({
                    message: 'Subscription upgraded to DAILY successfully',
                    newCartId,
                    bill,
                    subscription,
                })
            }
        }
    } catch (error) {
        res.status(500).json({ error, message: 'Something went wrong!' });
    }
}

exports.customToAlt = async (req, res, next) => {
    try {
        console.log("hi")
        const id = req.params.id;
        console.log(id)
        let subscriptionOld = await Subscription.findById(id);
        let productId = subscriptionOld.productId;
        console.log(productId);
        const product = await Product.findById(productId);
        let productPrice = product.discountedPrice;
        console.log(productPrice)
        let productImgUrl = product.imageUrl;
        console.log(productImgUrl)
        let oldbillId = subscriptionOld.billId;
        console.log(oldbillId);
        let cartId = subscriptionOld.cartId;
        console.log(cartId);
        let userId = subscriptionOld.userId;
        console.log(userId);
        let subwallet = subscriptionOld.subscriptionWallet;
        // let user = await User.findByIdAndUpdate(userId, { $inc: { walletCashbackAvailable: subwallet } });
        subscriptionOld = await Subscription.findByIdAndDelete(id);
        let bill = await Bill.findByIdAndDelete(oldbillId);
        let upgrade = "CUSTOM TO ALTERNATE";
        let cart = await Cart.findByIdAndUpdate(cartId, { upgrade });
        let startDate = req.body.startDate;
        startDate = moment(startDate).format('YYYY-MM-DD')
        let endDate = req.body.endDate;
        endDate = moment(endDate).format('YYYY-MM-DD')
        let total = req.body.total;
        let status = req.body.status;
        let address = req.body.address;
        let emailAddress = req.body.emailAddress;
        let mobileNumber = req.body.mobileNumber;
        //let days = req.body.days;
        let daysRemaining = req.body.daysRemaining;
        let deliveryQuantity = req.body.deliveryQuantity;
        let products = req.body.products;
        let newCartId;
        let normaldays = [];
        let altDays;

        if (total != 0) {
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

            console.log(altDays.length + "alternatedays")
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

            newCartId = cart._id
            /* carts.push(cartId);
            console.log(cartId) */

        }
        if (newCartId) {
            //Bill Created
            let bill = new Bill({
                invoiceNumber: await nanoid(),
                products: products,
                userId: userId,
                cartId: newCartId,
                amount: total,
                paymentStatus: status,

            });
            await bill.save()
            let billId = bill._id;

            let subscription;
            let deliveryFrequency;
            //2.  Create Sub here
            if (newCartId) {
                deliveryFrequency = 'ALTERNATE';
                subscription = new Subscription({
                    productId: productId,
                    //quantity: quantity,
                    deliveryQuantity: deliveryQuantity,
                    discountedPrice: productPrice,
                    imageUrl: productImgUrl,
                    userId: userId,
                    cartId: newCartId,
                    billId: billId,
                    addressId: address,
                    mobileNumber: mobileNumber,
                    emailAddress: emailAddress,
                    startDate: startDate,
                    daysRemaining: daysRemaining,
                    endDate: endDate,
                    days: altDays,
                    deliveryFrequency: deliveryFrequency,
                });
                await subscription.save();
            }
            let subscriptionId = subscription._id;
            const user = await Subscription.findByIdAndUpdate(subscriptionId, { $inc: { subscriptionWallet: total } });
            if (subscription) {
            io.getIO().emit('subscription:get',subscription );

                res.status(200).json({
                    message: 'Subscription upgraded to DAILY successfully',
                    newCartId,
                    bill,
                    subscription,
                })
            }
        }
    } catch (error) {
        res.status(500).json({ error, message: 'Something went wrong!' });
    }
}

exports.dailyToAlt = async (req, res, next) => {
    try {
        console.log("hi")
        const id = req.params.id;
        console.log(id)
        let subscriptionOld = await Subscription.findById(id);
        let productId = subscriptionOld.productId;
        console.log(productId);
        const product = await Product.findById(productId);
        let productPrice = product.discountedPrice;
        console.log(productPrice)
        let productImgUrl = product.imageUrl;
        console.log(productImgUrl)
        let oldbillId = subscriptionOld.billId;
        console.log(oldbillId);
        let cartId = subscriptionOld.cartId;
        console.log(cartId);
        let userId = subscriptionOld.userId;
        console.log(userId);
        // let subwallet = subscriptionOld.subscriptionWallet;
        // let user = await User.findByIdAndUpdate(userId, { $inc: { walletCashbackAvailable: subwallet } });
        subscriptionOld = await Subscription.findByIdAndDelete(id);
        let bill = await Bill.findByIdAndDelete(oldbillId);
        let upgrade = "DAILY TO ALTERNATE";
        let cart = await Cart.findByIdAndUpdate(cartId, { upgrade });
        let startDate = req.body.startDate;
        startDate = moment(startDate).format('YYYY-MM-DD')
        let endDate = req.body.endDate;
        endDate = moment(endDate).format('YYYY-MM-DD')
        let total = req.body.total;
        let status = req.body.status;
        let address = req.body.address;
        let emailAddress = req.body.emailAddress;
        let mobileNumber = req.body.mobileNumber;
        //let days = req.body.days;
        let daysRemaining = req.body.daysRemaining;
        let deliveryQuantity = req.body.deliveryQuantity;
        let products = req.body.products;
        let newCartId;
        let normaldays = [];
        let altDays;

        if (total != 0) {
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

            console.log(altDays.length + "alternatedays")
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

            newCartId = cart._id
            /* carts.push(cartId);
            console.log(cartId) */

        }
        if (newCartId) {
            //Bill Created
            let bill = new Bill({
                invoiceNumber: await nanoid(),
                products: products,
                userId: userId,
                cartId: newCartId,
                amount: total,
                paymentStatus: status,

            });
            await bill.save()
            let billId = bill._id;

            let subscription;
            let deliveryFrequency;
            //2.  Create Sub here
            if (newCartId) {
                deliveryFrequency = 'ALTERNATE';
                subscription = new Subscription({
                    productId: productId,
                    //quantity: quantity,
                    deliveryQuantity: deliveryQuantity,
                    discountedPrice: productPrice,
                    imageUrl: productImgUrl,
                    userId: userId,
                    cartId: newCartId,
                    billId: billId,
                    addressId: address,
                    mobileNumber: mobileNumber,
                    emailAddress: emailAddress,
                    startDate: startDate,
                    daysRemaining: daysRemaining,
                    endDate: endDate,
                    days: altDays,
                    deliveryFrequency: deliveryFrequency,
                });
                await subscription.save();
            }
            let subscriptionId = subscription._id;
            const user = await Subscription.findByIdAndUpdate(subscriptionId, { $inc: { subscriptionWallet: total } });
            if (subscription) {
            io.getIO().emit('subscription:get',subscription );

                res.status(200).json({
                    message: 'Subscription upgraded to ALTERNATE successfully',
                    newCartId,
                    bill,
                    subscription,
                })
            }
        }
    } catch (error) {
        res.status(500).json({ error, message: 'Something went wrong!' });
    }
}

exports.dailyToCustom = async (req, res, next) => { //done
    try {
        console.log("hi")
        const id = req.params.id;
        console.log(id)
        let subscriptionOld = await Subscription.findById(id);
        let productId = subscriptionOld.productId;
        console.log(productId);
        const product = await Product.findById(productId);
        let productPrice = product.discountedPrice;
        console.log(productPrice)
        let productImgUrl = product.imageUrl;
        console.log(productImgUrl)
        let oldbillId = subscriptionOld.billId;
        console.log(oldbillId);
        let cartId = subscriptionOld.cartId;
        console.log(cartId);
        let userId = subscriptionOld.userId;
        console.log(userId);
        let subwallet = subscriptionOld.subscriptionWallet;
        // let user = await User.findByIdAndUpdate(userId, { $inc: { walletCashbackAvailable: subwallet } });
        subscriptionOld = await Subscription.findByIdAndDelete(id);
        let bill = await Bill.findByIdAndDelete(oldbillId);
        let upgrade = "DAILY TO CUSTOM";
        let cart = await Cart.findByIdAndUpdate(cartId, { upgrade: upgrade });
        let startDate = req.body.startDate;
        startDate = moment(startDate).format('YYYY-MM-DD')
        let endDate = req.body.endDate;
        endDate = moment(endDate).format('YYYY-MM-DD')
        let total = req.body.total;
        let days = req.body.days;
        let status = req.body.status;
        let address = req.body.address;
        let emailAddress = req.body.emailAddress;
        let mobileNumber = req.body.mobileNumber;
        //let days = req.body.days;
        let daysRemaining = req.body.daysRemaining;
        let deliveryQuantity = req.body.deliveryQuantity;
        let products = req.body.products;
        let newCartId;
        if (total != 0) {
            let cart = new Cart({
                orderId: await nanoid(),
                products: products,
                userId: userId,
                //orderDate: normaldays[j],
                orderDays: days,
                //quantity: quantity,
                total: total,
                status: status,
                address: address,
            });
            await cart.save();

            newCartId = cart._id
            /* carts.push(cartId);
            console.log(cartId) */

        }
        if (newCartId) {
            //Bill Created
            let bill = new Bill({
                invoiceNumber: await nanoid(),
                products: products,
                userId: userId,
                cartId: newCartId,
                amount: total,
                paymentStatus: status,

            });
            await bill.save()
            let billId = bill._id;

            let subscription;
            let deliveryFrequency;
            //2.  Create Sub here
            if (newCartId) {
                deliveryFrequency = 'CUSTOM';
                subscription = new Subscription({
                    productId: productId,
                    //quantity: quantity,
                    deliveryQuantity: deliveryQuantity,
                    discountedPrice: productPrice,
                    imageUrl: productImgUrl,
                    userId: userId,
                    cartId: newCartId,
                    billId: billId,
                    addressId: address,
                    mobileNumber: mobileNumber,
                    emailAddress: emailAddress,
                    startDate: startDate,
                    daysRemaining: daysRemaining,
                    endDate: endDate,
                    days: days,
                    deliveryFrequency: deliveryFrequency,
                });
                await subscription.save();
            }
            let subscriptionId = subscription._id;
            const user = await Subscription.findByIdAndUpdate(subscriptionId, { $inc: { subscriptionWallet: total } });
            if (subscription) {
            io.getIO().emit('subscription:get',subscription );

                res.status(200).json({
                    message: 'Subscription upgraded to CUSTOM successfully',
                    newCartId,
                    bill,
                    subscription,
                })
            }
        }
    } catch (error) {
        res.status(500).json({ error, message: 'Something went wrong!' });
    }
}
/* exports.customToDaily = async (req, res, next) => {
    try {
        const id = req.params.id;
        const userId = req.body.userId;
        const mainOrderId = req.body.mainOrderId;
        const deliveryFrequency = "DAILY";
        const startDate = req.body.startDate;
        console.log(startDate + "hello")
        const endDate = req.body.endDate;
        let carts = [];
        let normaldays = [];
        const subscription = await Subscription.findByIdAndUpdate(id, { deliveryFrequency, startDate, endDate });
        //console.log(subscription)
        if (subscription) {
            let currentDate = moment().add(1, 'd').format('YYYY-MM-DD')
            console.log(currentDate)
            //Delete old orders and create new orders of remaining days
            const order = await Cart.deleteMany({ mainOrderId: mainOrderId, orderDate: { "$gte": currentDate, "$lte": endDate } })
            console.log(mainOrderId)
            console.log("orders deleted")

            const mainOrder = await Cart.findOne({ _id: mainOrderId });
            console.log(mainOrder)
            //let days = cart.orderDays;
            //let userId = cart.userId;
            let products = mainOrder.products;
            let total = mainOrder.total;
            let address = mainOrder.address;
            let status = mainOrder.status;

            let terminate = mainOrder.terminate;
            let pause = mainOrder.isPause;
            if (terminate == false && pause == false) {
                {
                    for (var m = moment(startDate); m.isSameOrBefore(endDate); m.add(1, 'days')) {
                        normaldays.push(m.format('YYYY-MM-DD'));
                    }
                    for (j = 0; j < normaldays.length; j++) {
                        console.log(normaldays)

                        //for (i = 0; i < noofdays.length; i++){
                        //Order Created
                        let cart = new Cart({
                            orderId: await nanoid(),
                            products: products,
                            userId: userId,
                            orderDate: normaldays[j],
                            total: total,
                            mainOrderId,
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
            }

            if (carts) {
                res.status(201).json({ status: 'success', cart, message: 'Subscription upgraded to daily successfully!' });
            }
        }
    } catch (error) {
        res.status(500).json({ error, message: 'Something went wrong!' });
    }
}
 */
/* exports.dailyToAlt = async (req, res, next) => {
    try {
        console.log("hello")
        const id = req.params.id;
        const userId = req.body.userId;
        const mainOrderId = req.body.mainOrderId;
        console.log(mainOrderId)
        //taking below as new input from user 
        const quantity = req.body.quantity;
        const startDate = req.body.startDate;
        const endDate = req.body.endDate;

        const deliveryFrequency = "ALTERNATE";
        let carts = [];
        //let normaldays = [];
        let subscriptionOld = await Subscription.findById(id);
        console.log(subscriptionOld + "hello")
        let oldDays = []
        oldDays = subscriptionOld.days;
        //let endDate = subscriptionOld.endDate;


        console.log(oldDays + "olddays")
        let currentDate = moment().format('YYYY-MM-DD')
        let index = oldDays.indexOf(currentDate);
        console.log(index + "index")

        var x = [];
        /*      for (var i = 0; i < oldDays.length; i = i + 1) {
                 x.push(oldDays[i]);
             }
             console.log(x); */

/*oldDays.splice(i + 1, index + 1);

for (var i = 0; i < oldDays.length; i++)
    if (i % 2 == 1)
        x.push(oldDays[i]);
console.log(x + "removed days " + x.length);
console.log(oldDays + "remaining")
let difference = oldDays.filter(y => !x.includes(y));
console.log(difference + "diff")

//need to push difference days into subscription days after deleteing dates from index of current date + 1 
const subscription = await Subscription.findByIdAndUpdate(id, { deliveryFrequency });
//console.log(subscription)
if (subscription) {
    let currentDate = moment().add(1, 'd').format('YYYY-MM-DD')
    console.log(currentDate)
    //Delete old orders and create new orders of remaining days
    const order = await Cart.deleteMany({ mainOrderId: mainOrderId, orderDate: { "$gte": currentDate, "$lte": endDate } })
    console.log(mainOrderId)
    console.log("orders deleted")

    const mainOrder = await Cart.findOne({ _id: mainOrderId });
    console.log(mainOrder)
    //let days = cart.orderDays;
    //let userId = cart.userId;
    let products = mainOrder.products;
    let total = mainOrder.total;
    let address = mainOrder.address;
    let status = mainOrder.status;

    let terminate = mainOrder.terminate;
    let pause = mainOrder.isPause;
    if (terminate == false && pause == false) {
        {
            for (var m = moment(startDate); m.isSameOrBefore(endDate); m.add(1, 'days')) {
                normaldays.push(m.format('YYYY-MM-DD'));
            }
            for (j = 0; j < difference.length; j++) {

                //for (i = 0; i < noofdays.length; i++){
                //Order Created
                let cart = new Cart({
                    orderId: await nanoid(),
                    products: products,
                    userId: userId,
                    orderDate: difference[j],
                    total: total,
                    mainOrderId,
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
    }
    //console.log(normaldays)

    if (carts) {
        res.status(201).json({ status: 'success', carts, message: 'Subscription upgraded to daily successfully!' });
    }
}
} catch (error) {
res.status(500).json({ error, message: 'Something went wrong!' });
}
}
*/

exports.increaseQuantity = async (req, res, next) => {
    try {
        const id = req.params.id;
        const cartId = req.body.cartId;
        const billId = req.body.billId;
        const deliveryQuantity = req.body.deliveryQuantity;
        const total = req.body.total;
        const products = req.body.products;

        let subscription = await Subscription.findByIdAndUpdate(id, { deliveryQuantity: deliveryQuantity, subscriptionWallet: total });
        let cart = await Cart.findByIdAndUpdate(cartId, { products: products, total: total });
        let bill = await Bill.findByIdAndUpdate(billId, { products: products, amount: total });

        if (subscription) {

            io.getIO().emit('subscription:get',subscription );


            res.status(200).json({ success: true, message: 'Subscription delivery quantity increased successfully', subscription, cart, bill })
        }
    } catch (error) {
        res.status(500).json({ message: error.message, devMessage: "Something went wrong!" });
    }
}

exports.decreaseQuantity = async (req, res, next) => {
    try {
        const id = req.params.id;
        const userId = req.body.userId;
        const deliveryQuantity = req.body.deliveryQuantity;
        const total = req.body.total;
        const products = req.body.products;
        const cartId = req.body.cartId;
        const billId = req.body.billId;

        let subscription = await Subscription.findByIdAndUpdate(id, { deliveryQuantity: deliveryQuantity, subscriptionWallet: total });
        let cart = await Cart.findByIdAndUpdate(cartId, { products: products, total: total });
        let bill = await Bill.findByIdAndUpdate(billId, { products: products, amount: total });
        //const user = await User.findByIdAndUpdate(userId, { $inc: { walletCashbackAvailable: total } });

        if (subscription) {
            io.getIO().emit('subscription:get',subscription );


            res.status(200).json({ success: true, message: 'Subscription delivery quantity decreased successfully', subscription,bill,cart })
        }
    } catch (error) {
        res.status(500).json({ message: error.message, devMessage: "Something went wrong!" });
    }
}



/* exports.upgradeAlt = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deliveryFrequency = "DAILY";
        const startDate = req.body.startDate;
        const endDate = req.body.endDate;
        let normaldays = [];

        const subscription = await Subscription.findByIdAndUpdate(id, { deliveryFrequency, startDate, endDate });
        //Delete old orders and create new orders of remaining days
        const order = await Cart.find({})
        for (var m = moment(startDate); m.isSameOrBefore(endDate); m.add(1, 'days')) {
            normaldays.push(m.format('YYYY-MM-DD'));
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

            // }
        }


        if (subscription) {
            res.status(201).json({ status: 'success', subscription, message: 'Subscription paused successfully!' });
        }

    } catch (error) {
        res.status(500).json({ error, message: 'Something went wrong!' });
    }
} */
/* 

exports.upgradeCustom = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deliveryFrequency = "DAILY";
        const startDate = req.body.startDate;
        const endDate = req.body.endDate;
        let normaldays = [];

        const subscription = await Subscription.findByIdAndUpdate(id, { deliveryFrequency, startDate, endDate });
        //Delete old orders and create new orders of remaining days
        const order = await Cart.find({})
        for (var m = moment(startDate); m.isSameOrBefore(endDate); m.add(1, 'days')) {
            normaldays.push(m.format('YYYY-MM-DD'));
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

            // }
        }


        if (subscription) {
            res.status(201).json({ status: 'success', subscription, message: 'Subscription paused successfully!' });
        }
    } catch (error) {
        res.status(500).json({ error, message: 'Something went wrong!' });
    }
} */
exports.vacation = async (req, res, next) => {
    try {
        const id = req.params.id;
        console.log("hello" + id)
        const onVacation = req.body.onVacation;
        const vacationStart = req.body.vacationStart;

        const vacationEnd = req.body.vacationEnd;
        console.log(vacationEnd)

        //const df = vacationStart.diff(vacationEnd, 'days') 
        //const newEndDate = moment().add(df, 'd').toDate();
        const subscription = await Subscription.findOneAndUpdate({ _id: id }, { onVacation, vacationStart, vacationEnd });
        //console.log(df+"hello")

        if (subscription) {
            res.status(201).json({ status: 'success', subscription, message: 'Subscription paused successfully!' });
            //io.getIO.emit('sub:pause', { subscription: subscription });
        }

    } catch (error) {
        res.status(500).json({ error, message: 'Something went wrong!' });
    }
}
const Subscription = require('./../Models/subscriptionModel');
const User = require('../Models/userModel');
const Bill = require('../Models/billingModel');
const { customAlphabet } = require('nanoid/async')
const nanoid = customAlphabet('1234567890', 6);

var moment = require('moment');

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

            res.status(200).json({ success: true, subscription })
        }
    } catch (error) {
        res.status(500).json({ message: error.message, devMessage: "Something went wrong!" });
    }
}

exports.getSubscriptionById = async (req, res, next) => {
    try {
        const id = req.params.id;

        const subscription = await Subscription.findById(id).populate('userId billId cartId');

        if (subscription) {
            res.status(200).json({ success: true, subscription })
        }
    } catch (error) {
        res.status(500).json({ message: error.message, devMessage: "Something went wrong!" });
    }
}

exports.getSubscriptionByUserId = async (req, res, next) => {
    try {
        const id = req.params.id;

        const subscription = await Subscription.find({ userId: id }).sort({ createdAt: -1 }).populate('userId cartId billId');

        if (subscription) {
            res.status(200).json({ success: true, subscription })
        }
    } catch (error) {
        res.status(500).json({ message: error.message, devMessage: "Something went wrong!" });
    }
}


exports.updateSubscription = async (req, res, next) => {
    try {
        const id = req.params.id;
        let subscription = await Subscription.findOneAndUpdate({ _id: id }, req.body);

        if (subscription) {
            res.status(200).json({ success: true, message: 'Subscription updated successfully', subscription })
            io.getIO().emit('subscription:get', { action: 'updated', subscription })
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

        //const user = await User.findById(id);

        //let { startDate, endDate } = user;

        //let dateArray=[];
        //dateArray=req.body.dateArray;
        //const totalDays= $sum(req.body);
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

        if (isActive == false) {
            const subscription = await Subscription.findByIdAndUpdate(id, req.body);
            res.status(201).json({ status: 'success', subscription, message: 'Subscription paused successfully!' });
            io.getIO().emit('subscription:get', { action: 'updated', subscription })
            //io.getIO.emit('sub:pause', { subscription: subscription });
        }

        else if (isActive == true) {
            const subscription = await Subscription.findByIdAndUpdate(id, req.body);
            res.status(201).json({ status: 'success', subscription, message: 'Subscription resumed successfully!' });
            io.getIO().emit('subscription:get', { action: 'updated', subscription })
            //io.getIO.emit('sub:resume', { subscription: subscription });
        }

    } catch (error) {
        res.status(500).json({ error, message: 'Something went wrong!' });
    }
}
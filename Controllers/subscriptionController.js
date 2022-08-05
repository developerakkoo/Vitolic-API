const Subscription = require('./../Models/subscriptionModel');


exports.postSubscription = async (req, res, next) => {
    try {
        const invoiceNumber = req.body.invoiceNumber;
        const milk = req.body.milk;
        const customerName = req.body.customerName;
        const phone = req.body.phone;
        const emailId = req.body.emailId;
        const address = req.body.address;
        const deliveryFrequency = req.body.deliveryFrequency;
        const deliveryPerson = req.body.deliveryPerson;


        const subscription = await Subscription.create(req.body);

        if (!subscription) {
            res.status(500).json({ message: 'Subscription create error' })
        }

        res.status(200).json({
            subscription: subscription,
            message: 'Subscription created Successfully',
        })
    }
    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
}



exports.getSubscription = async (req, res, next) => {
    try {
        
        let subscription = await Subscription.find({});
        if(subscription){
            res.status(200).json({success: true, subscription})
        }
    } catch (error) {
        res.status(500).json({message: error.message, devMessage:"Something went wrong!"});
    }
}

exports.getSubscriptionById = async (req, res, next) => {
    try {
        const id = req.params.id;

        const subscription = await Subscription.findOneAndUpdate({ _id: id }, req.body);

        if(subscription){
            res.status(200).json({success: true, subscription})
        }
    } catch (error) {
        res.status(500).json({message: error.message, devMessage:"Something went wrong!"});
    }
}


exports.updateSubscription = async (req, res, next) => {
    try {
        const id = req.params.id;
        let subscription = await Subscription.findOneAndUpdate({ _id: id }, req.body);
        if(subscription){
            res.status(200).json({success: true,message:'Subscription updated successfully', subscription})
        }
    } catch (error) {
        res.status(500).json({message: error.message, devMessage:"Something went wrong!"});
    }
}

exports.deleteSubscription = async(req, res, next) => {
    try {

        const id = req.params.id;

        const subscription = await Subscription.findOneAndDelete(id);

        if(subscription){
            res.status(200).json({ status: true, message:'Subscription deleted successfully', subscription: subscription })
        }
    } catch (error) {
        res.status(404).json({ status: false,  error: error, message: error.message });
    }
}


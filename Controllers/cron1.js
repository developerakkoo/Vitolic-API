const cron = require('node-cron');
const Subscription = require('../Models/subscriptionModel');


cron.schedule('* * * * *', async() => {
    const notifications = await Subscription.find({
        isPaymentDue: false,
        daysRemaining : 7
    })
    console.log(`Count of unsent notification: ${notifications.length}`);
    console.log(notifications);
    notifications.forEach(async (subscription) => {
    const notify = await Subscription.findByIdAndUpdate(subscription._id,{
        isPaymentDue : false
    });
    }).then((result) => {
    console.log("notification send")
    })
})
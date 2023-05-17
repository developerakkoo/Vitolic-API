const cron = require('node-cron')
const moment = require('moment');
const Subscription = require('../Models/subscriptionModel');





cron.schedule('* * * * *', async() => {
    const notifyUser = await Subscription.find({
        daysRemaining:3,
        isSubscriptionEnding:false
    }).populate('userId')
    
    console.log(`Count of unsent notification: ${notifyUser.length}`)
    notifyUser.forEach(notification => {
        console.log(notification.userId.contactNumber)

        // console.log(`unsent notification: ${notification.userId.contactNumber}`)
    })
    // console.log(`unsent notification: ${notifyUser[0].userId.contactNumber}`)
    // console.log(notifyUser['userId'])
})
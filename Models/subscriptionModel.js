const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const subscriptionSchema = new Schema({
    
    userId:{ type: Schema.Types.ObjectId, ref: 'User'},
    billId:{ type: Schema.Types.ObjectId, ref: 'Billing'},
    cartId:{ type: Schema.Types.ObjectId, ref: 'Cart'},

  
    isCustom:{
        type: Boolean
    },
    customStartDate: {
        type: Date
    },
    customEndDate:{
        type: Date
    },
    
    startDate:{
        type: Date
    },
    endDate:{
        type: Date
    },

    days:[
        {
           count:{
            type: Number
           },
           name: {
            type: String
           }
        }
    ],
    deliveryFrequency: {
        type: String,
        enum:['DAILY', 'ALTERNATE', 'ONETIME']
        //required: [true, 'Delivery Frequency is required']
    },
 
})


module.exports = mongoose.model('Subscription', subscriptionSchema);
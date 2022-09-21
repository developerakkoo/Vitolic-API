const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const subscriptionSchema = new Schema({

    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    billId: { type: Schema.Types.ObjectId, ref: 'Billing' },
    cartId: { type: Schema.Types.ObjectId, ref: 'Cart' },


    isNormal: {
        type: Boolean

    },

    isAlternate: {
        type: Boolean

    },
    isCustom: {
        type: Boolean
    },

    customStartDate: {
        type: String
    },
    customEndDate: {
        type: String
    },

    startDate: {
        type: String
    },
    endDate: {
        type: String
    },

    days: [
        {
            count: {
                type: Number
            },
            name: {
                type: String
            }
        }
    ],
    deliveryFrequency: {
        type: String,
        enum: ['DAILY', 'ALTERNATE', 'ONETIME']
        //required: [true, 'Delivery Frequency is required']
    },

},
    {
        timestamps: true
    })


module.exports = mongoose.model('Subscription', subscriptionSchema);
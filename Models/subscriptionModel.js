const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const subscriptionSchema = new Schema({

    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    billId: { type: Schema.Types.ObjectId, ref: 'Billing' },
    cartId: [],
    productId: { type: String },

    daysremaining: { type: String },
    isNormal: {
        type: Boolean

    },

    isAlternate: {
        type: Boolean

    },
    isCustom: {
        type: Boolean
    },
    onVacation: {
        type: Boolean
    },
    vacationStart: {
        type: String
    },
    vacationEnd: {
        type: String
    },
    newEndDate: {
        type: String
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

    isActive: {
        type: Boolean, default: true

    },
    daysRemaining: {
        type: Number
    },

    days: [{}],

    deliveryFrequency: {
        type: String,
        enum: ['DAILY', 'ALTERNATE', 'ONETIME', 'CUSTOM']
        //required: [true, 'Delivery Frequency is required']
    },

},
    {
        timestamps: true
    })


module.exports = mongoose.model('Subscription', subscriptionSchema);
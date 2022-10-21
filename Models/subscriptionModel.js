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
    resumeDate: {
        type: String
    },
    pauseDate: {
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
    productPurchasePrice: {
        type: Number
    },
    startDate: {
        type: String
    },
    endDate: {
        type: String
    },
    subscriptionWallet: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean, default: true
    },
    terminate: {
        type: Boolean,
    },
    daysRemaining: {
        type: Number
    },

    days: [],

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
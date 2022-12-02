const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const subscriptionSchema = new Schema({

    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    billId: { type: Schema.Types.ObjectId, ref: 'Billing' },
    cartId: { type: Schema.Types.ObjectId, ref: 'Cart' },
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    addressId: { type: Schema.Types.ObjectId, ref: 'Address' },
    mobileNumber: { type: Number },
    emailAddress: { type: String },
    discountedPrice: { type: Number },
    deliveryQuantity: { type: Number, min: 1 },
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
        default: false
    },
    daysRemaining: {
        type: Number
    },

    days: { type: Array, "default": [] },

    deliveryFrequency: {
        type: String,
        enum: ['DAILY', 'ALTERNATE', 'ONETIME', 'CUSTOM']
        //required: [true, 'Delivery Frequency is required']
    },
    imageUrl: {
        type: String,
        default: 'https://image.shutterstock.com/image-illustration/default-white-background-template-without-600w-1971913538.jpg'
    },
},
    {
        timestamps: true
    })


module.exports = mongoose.model('Subscription', subscriptionSchema);
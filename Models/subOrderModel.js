const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const subOrderSchema = new Schema({

    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    address: { type: Schema.Types.ObjectId, ref: 'Address' },
    pincode: { type: String },
    subscription: { type: Schema.Types.ObjectId, ref: 'Subscription' },
    orderId: { type: Number },
    status: { type: String },
    billId: { type: Schema.Types.ObjectId, ref: 'Billing' },
    total: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
    },
    isDelivered: {
        type: Boolean,
        default: false
    },
    orderDate: { type: String },
    orderDays: { type: Array, "default": [] },
    type: {
        type: String,

    },
    terminate: {
        type: Boolean,
        default: false
    },
    isPause: {
        type: Boolean,
        default: false
    },
    upgrade: { type: String, default: "NA" },
    mainOrderId: { type: String, default: null },
}, {
    timestamps: true
});


module.exports = mongoose.model('subOrder', subOrderSchema);
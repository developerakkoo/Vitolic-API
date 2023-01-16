const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const itemSchema = new Schema({
    products: [{

    }],
    userId: { type: Schema.Types.ObjectId, ref: 'User' },



    total: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Item", itemSchema);


const cartSchema = new Schema({
    products: [{

    }],
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    address: { type: Schema.Types.ObjectId, ref: 'Address' },
    pincode: {type: String, default: "422191"},
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
    type:{
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
    mainOrderId: { type: String },
}, {
    timestamps: true
});


module.exports = mongoose.model('Cart', cartSchema);
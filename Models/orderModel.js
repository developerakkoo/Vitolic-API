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
    subscription: { type: Schema.Types.ObjectId, ref: 'Subscription' },
    orderId: { type: Number },
    status: { type: String },
    billId: { type: Schema.Types.ObjectId, ref: 'Billing' },
    total: {
        type: Number,
        required: true
    },
    isDelivered: {
        type: Boolean,
        default: false
    },
    orderDate: { type: String },
    orderDays:[],
    terminate:{
        type: Boolean,
        default: false
    },
    isPause: {
        type: Boolean,
        default: false
    },
    mainOrderId:{ type: String },
}, {
    timestamps: true
});


module.exports = mongoose.model('Cart', cartSchema);
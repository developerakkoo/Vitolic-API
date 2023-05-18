const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const placedOrderSchema = new Schema({

    orderId: {
        type: String
    },
    title: {
        type: String
    },
    image: String,
    totalAmount: {
        type: Number,
    },
    couponCode: {
        type: String
    },

    slot: {
        createdDate: {
            type: Date,
        },

        startTime: {
            type: Date
        },

        endTime: {
            type: Date
        }

    },


    items: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: { type: Number, required: true, default: 1 },
            price: { type: Number, required: true, default: 0 },
            title: { type: String },
            url: { type: String },
            orderPrice: { type: Number },
            subTotal: { type: Number },
            units: { type: String }
        },
    ],


    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',

    },
    productId: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
    }],


    cordinates: {
        type: [Number]
    },


    status: {
        type: String,
        default: 'Ready to dispatch.'
    },

    isDelivered: {
        type: Boolean,
        default: false
    }
    ,
    paymentMode: {
        type: String,

    }
}, {
    timestamps: true
});


module.exports = mongoose.model('PlacedOrder', placedOrderSchema);
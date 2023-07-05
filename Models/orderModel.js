const mongoose = require('mongoose');
const moment =  require ('moment');
const mongoosePaginate = require('mongoose-paginate');
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
    subOrders:[{type: Schema.Types.ObjectId, ref:"subOrder"}],
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
    refDate:{
        type:String,
        default:moment().format("DD-MM-YYYY")
    },
}, {
    timestamps: true
});

cartSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Cart', cartSchema);
const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const billingSchema = new Schema({

    
    invoiceNumber:{
        type: String,
        //required: [true, 'Invoice number is required']
    },

    userId: { type: Schema.Types.ObjectId, ref: 'User' },

    subscriptionId: { type: String },

    orderId: { type: String },

    amount: { type: Number, },

    products: [{

    }],

    paymentStatus: { type: Boolean },
}, {
    timestamps: true
});


module.exports = mongoose.model('Billing', billingSchema);
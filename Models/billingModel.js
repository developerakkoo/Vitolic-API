const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const billingSchema = new Schema({
    amount: { type: Number, },

    product: { type: String },

    paymentStatus: { type: String },
}, {
    timestamps: true
});


module.exports = mongoose.model('Billing', billingSchema);
const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const promocodeSchema = new Schema({
    offer: { type: String, },
    promoCode: { type: String, },
    maxAmount: { type: Number, },
}, { timestamps: true });


module.exports = mongoose.model("Promocode", promocodeSchema);
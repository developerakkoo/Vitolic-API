const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const promocodeSchema = new Schema({
    offer: { type: String, },
    promoCode: { type: String, },
    value: { type: Number, },

}, { timestamps: true });


module.exports = mongoose.model("Promocode", promocodeSchema);
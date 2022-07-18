const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const couponSchema = new Schema({
    code: {type: String,},
    discount: {type: Number,},
    description: {type: String}
},{timestamps: true});


module.exports = mongoose.model("Coupon",couponSchema);
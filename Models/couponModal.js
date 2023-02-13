const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const couponSchema = new Schema({
    code: {type: String,},
    discount: {type: Number,},
    description: {type: String},
    userId: {type: String, default:"EMPTY"}
},{timestamps: true});


module.exports = mongoose.model("Coupon",couponSchema);
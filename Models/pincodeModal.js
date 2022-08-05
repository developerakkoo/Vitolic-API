const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const pincodeSchema = new Schema({
    areaName: { type: String, },
    pincode: { type: String, },
}, { timestamps: true });


module.exports = mongoose.model("Pincode", pincodeSchema);
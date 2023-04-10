const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const pincodeSchema = new Schema({
    areaName: { type: String, },
    pincode: { type: String, },
    deliveryState: { type: String, },
    divisionName: { type: String, },
    region: { type: String, },
    taluka: { type: String, },
    district: { type: String, },
    state: { type: String, },
    center: { type: String, },
    route: { type: String, },
    deliveryPerson: { type: Schema.Types.ObjectId, ref:"DeliveryBoy" },

}, { timestamps: true });


module.exports = mongoose.model("Pincode", pincodeSchema);
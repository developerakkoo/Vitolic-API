const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const helpSchema = new Schema({
    userId: {type: mongoose.Types.ObjectId, ref: "User"},
    orderId: {type: mongoose.Types.ObjectId, ref: "Cart"},
    description: {type: String}
},{timestamps: true});


module.exports = mongoose.model("Help",helpSchema);
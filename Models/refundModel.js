const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const refundSchema = new Schema({
    userId:{
        type: String,
        required: [true, 'UserId is required']
    },

    orderId:{
        type: String,
        required: [true, 'OrderId is required']
    },

    description:{
        type: String,
        required: [true, 'Description is required']
    }
})


module.exports = mongoose.model('Refund', refundSchema);
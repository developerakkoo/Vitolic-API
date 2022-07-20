const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const refundSchema = new Schema({
    userId:{
        type: String,
        required: [true, 'Email is required']
    },

    orderId:{
        type: String,
        required: [true, 'Password is required']
    },
    
    description:{
        type: String,
        required: [true, 'Password is required']
    }
})


module.exports = mongoose.model('Refund', refundSchema);
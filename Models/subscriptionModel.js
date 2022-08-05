const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const subscriptionSchema = new Schema({
    invoiceNumber:{
        type: String,
        //required: [true, 'Invoice number is required']
    },

    milk:{
        type: String,
    },
    
    customerName:{
        type: String,
        //required: [true, 'Customer name is required']
    },
    phone:{
        type: Number,
        //required: [true, 'Phone number is required']
    },
    emailId:{
        type: String,
        //required: [true, 'Email Id is required']
    },
    address: {
        type: String,
        //required: [true, 'Address is required']
    },
    deliveryFrequency: {
        type: String,
        //required: [true, 'Delivery Frequency is required']
    },
    deliveryPerson: {
        type: String,
        //required: [true, 'Delivery Person is required']
    }
})


module.exports = mongoose.model('Subscription', subscriptionSchema);
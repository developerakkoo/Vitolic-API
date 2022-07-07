const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const quantitySchema = new Schema({
  
    units:{
        type: String,
        required: [true, 'Please provide a valid unit']
    },
    price:{
        type: String, required: [true, 'Please provide a valid price']
    },

    discountedPrice:{
        type: String, required: [true, 'Please provide a valid discount price']
    }


})

module.exports = mongoose.model('Quantity', quantitySchema);
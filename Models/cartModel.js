const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const itemSchema = new Schema({
    productId:{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },

    quantity:{ type: Number, required: true, min: [1, "Quantity cannot be less than 1."]},

    price:{
        type: Number, required: true
    },

    total:{
        type: Number,
        required: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model("Item", itemSchema);


const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
       
    },

    products: [itemSchema],

    subTotal:{
        default: 0,
        type: Number,
    }
},{
    timestamps: true
});


module.exports = mongoose.model('Cart', cartSchema);
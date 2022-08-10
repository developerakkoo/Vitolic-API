const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const itemSchema = new Schema({
    products:[{
        
    }],
    userId:{ type: Schema.Types.ObjectId, ref: 'User'},



    total:{
        type: Number,
        required: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model("Item", itemSchema);


const cartSchema = new Schema({
    products:[{
        
    }],
    userId:{ type: Schema.Types.ObjectId, ref: 'User'},
    address:{ type: Schema.Types.ObjectId, ref: 'Address'},

    status:{ type: String},

    total:{
        type: Number,
        required: true
    },
    isDelivered:{
        type: Boolean,
        default: false
    }
},{
    timestamps: true
});


module.exports = mongoose.model('Cart', cartSchema);
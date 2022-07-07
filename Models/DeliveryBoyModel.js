const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const boySchema = new Schema({

    fullName:{
        type: String,
        required: [true, 'First Name is required']
    },
   
    email:{
        type: String,
        required: [true, 'Email is required']
    },

    password:{
        type: String,
        required: [true, 'Password is required']
    },
    contactNumber:{
        type: String,
        required: [true, 'Contact Number is required']
    },
   
    cordinates:{
        type: [Number]
    },

    resetPasswordToken: {
      type: String
    },
    
    expiredPasswordToken:{
    type: String,
    },
      
    orders: [
        {type: Schema.Types.ObjectId, ref: 'PlacedOrder'},
    ],

    slot: [
        {type: Schema.Types.ObjectId, ref:'Slot'}
    ]

    

}, {
    timestamps: true
})



module.exports = mongoose.model('DeliveryBoy', boySchema);
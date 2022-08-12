const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const boySchema = new Schema({

    fullName:{
        type: String,
      
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
      
    isOnline: { type: Boolean, default: false },
 
    

}, {
    timestamps: true
})



module.exports = mongoose.model('DeliveryBoy', boySchema);
const mongoose = require('mongoose');
const { NumberPage } = require('twilio/lib/rest/pricing/v1/voice/number');

const Schema = mongoose.Schema;

const addressSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required:[true, 'User is required for saving Address']
    },

addLine1:{
	type:String
},
addLine2:{
	type:String
},
state:{
	type:String
},
city:{
	type:String
},
landmark:{
	type:String
},
society:{
	type:String
},
pincode:{
	type:String
},
coordinates:{
        type: [Number],
        required: true, 
        
        
    },
},{
    timestamps: true
});

module.exports = mongoose.model('Address', addressSchema);






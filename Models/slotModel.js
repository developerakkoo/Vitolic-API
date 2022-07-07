const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const slotSchema = new Schema({

    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
       required: true
    }, 

    todaysDate: {
        type: Date,
        default: Date.now,
       required: true
    },

   

    slotAvailable: {
        type: Number,
        default: 0,
        minimum: 0,
        maximum: [10,"No more Slots Available"]
    },

    orders:[
        {type: mongoose.Types.ObjectId, ref: 'PlacedOrder'}
    ]


},{
    timestamps: true
})


module.exports = mongoose.model('Slot', slotSchema);
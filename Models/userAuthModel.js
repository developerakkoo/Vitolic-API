const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userAuthSchema = new Schema({
    email:{
        type: String,
        required: [true, 'Email is required']
    },
    password:{
        type: String,
        required: [true, 'Password is required']

    },

    profile:{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('UserAuth', userAuthSchema);
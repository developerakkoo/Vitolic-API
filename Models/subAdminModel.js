const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const subAdminSchema = new Schema({
    email:{
        type: String,
        required: [true, 'Email is required']
    },

    password:{
        type: String,
        required: [true, 'Password is required']
    }
})


module.exports = mongoose.model('SubAdmin', subAdminSchema);
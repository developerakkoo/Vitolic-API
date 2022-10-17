const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const citySchema = new Schema({
    city:{
        type: String,
    }

},{
    timestamps: true
})


module.exports = mongoose.model('City', citySchema);
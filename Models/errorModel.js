const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const errorSchema = new Schema({
    message: {type: String,},
   
},{timestamps: true});


module.exports = mongoose.model("Error",errorSchema);
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bannerSchema = new Schema({
    imageUrl:{
        type: String,
        required: [true, "Please send a valid file in formdata"]
    }

},{
    timestamps: true
})


module.exports = mongoose.model('Banner', bannerSchema);
const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const petProductSchema = new Schema({

    title:{
        type: String,
        required: [true, 'title is required'],
    },

    price:{
        type: Number,
        required: [true, 'price is required'],

    },

    discountedPrice:{
        type: Number,
        required: [true, 'discountedPrice is required'],

    },

    quantity:[
        {
            type: Number,
            required: [true, 'Quantity is required'],
        }
    ],
    
    inStock:{
        type: String,
        required: [true, 'inStock is required']
    },
    mainCategory:[
        {type: String, required: [true, 'Main Category is required']}
    ],

    subCategory:[
        {type:String, required: [true, 'Sub Category is required']}
    ],

    stock:{
        type: Number,
        required: [true, 'stock is required']
    },

    units:{
        type: String,
        default: 'item'
    },

    imageUrl:{
        type: String,
        default: 'https://image.shutterstock.com/image-illustration/default-white-background-template-without-600w-1971913538.jpg'
    },

    imageFilePath:{
        type: String,
    }

},
{timestamps: true}
);


module.exports = mongoose.model('PetProduct', petProductSchema);

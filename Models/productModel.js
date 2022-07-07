const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const productSchema = new Schema({

    title:{
        type: String,
        required: [true, 'title is required'],
    },

    price:{
        type: String,
        required: [true, 'price is required'],

    },

    discountedPrice:{
        type: Number,
        required: [true, 'discountedPrice is required'],

    },

    quantity:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Quantity'
        }
    ],
    
    inStock:{
        type: String,
        required: [true, 'inStock is required']
    },
    category:{
        type: String,
        required: [true, 'category is required'],
        enum: {
            values: ['DRYFRUIT', 'EXOTIC', 'VEGETABLE', 'LEAFYVEGETABLE', 'FRUITS', 'SALAD', 'BAKERYPRODUCT'],
            message: 'Only DRYFRUIT, EXOTIC, VEGETABLE, LEAFYVEGETABLE, FRUITS, SALAD, BAKERYPRODUCT is available'
        },
    },

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


module.exports = mongoose.model('Product', productSchema);

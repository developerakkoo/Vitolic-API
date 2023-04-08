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
    },

    isActive:{
        type: Boolean,
        default: true
    },

    isProductAdd:{
        type: Boolean,
        default: false
    },

    isProductEdit:{
        type: Boolean,
        default: false
    },

    isProductDelete:{
        type: Boolean,
        default: false
    }
,
    isOrderAdd:{
        type: Boolean,
        default: false
    },

    isOrderEdit:{
        type: Boolean,
        default: false
    },

    isOrderDelete:{
        type: Boolean,
        default: false
    },

    isUserAdd:{
        type: Boolean,
        default: false
    },

    isUserEdit:{
        type: Boolean,
        default: false
    },

    isUserDelete:{
        type: Boolean,
        default: false
    },

    isBoyAdd:{
        type: Boolean,
        default: false
    },

    isBoyEdit:{
        type: Boolean,
        default: false
    },

    isBoyDelete:{
        type: Boolean,
        default: false
    },

    isPromoAdd:{
        type: Boolean,
        default: false
    },

    isPromoEdit:{
        type: Boolean,
        default: false
    },

    isPromoDelete:{
        type: Boolean,
        default: false
    },

    isBannerAdd:{
        type: Boolean,
        default: false
    },

    isBannerEdit:{
        type: Boolean,
        default: false
    },

    isBannerDelete:{
        type: Boolean,
        default: false
    },

    isSubscriptionAdd:{
        type: Boolean,
        default: false
    },

    isSubscriptionEdit:{
        type: Boolean,
        default: false
    },

    isSubscriptionDelete:{
        type: Boolean,
        default: false
    },

    isCityAdd:{
        type: Boolean,
        default: false
    },

    isCityEdit:{
        type: Boolean,
        default: false
    },

    isCityDelete:{
        type: Boolean,
        default: false
    }
    
})


module.exports = mongoose.model('SubAdmin', subAdminSchema);
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({


  fName: {
    type: String,
  },

  email: {
    type: String,

  },

  contactNumber: {
    type: String,
  }
  ,
  walletCashbackAvailable: {
    type: Number,
    default: 0
  },

  couponCode: {
    type: String, default: "NA"

  },

  resetPasswordToken: {
    type: String
  },

  expiredPasswordToken: {
    type: String,
  },

  address: {
    type: String,
  },

  addressId: {
    type: Schema.Types.ObjectId,
    ref: 'Address',
  },

  isOnline: { type: Boolean, default: false },

  firebaseToken: { type: String },

  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: { type: Number, required: true, default: 1 },
        price: { type: Number, required: true, default: 0 },
        title: { type: String },
        url: { type: String },
        orderPrice: { type: Number },
        subTotal: { type: Number },
        units: { type: String }

      },
    ],


  },

}, {
  timestamps: true
})

userSchema.methods.addToCart = function (product) {
  // console.log("PRODUCT in ADDTOCART:- " + product.discountedPrice * product.stock);
  const cartProductIndex = this.cart.items.findIndex(cp => {
    return cp.productId.toString() === product._id.toString();
  });
  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];
  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
    updatedCartItems[cartProductIndex].orderPrice = newQuantity * product.discountedPrice;
    updatedCartItems[cartProductIndex].subTotal = newQuantity * product.discountedPrice;
  } else {
    updatedCartItems.push({
      productId: product._id,
      title: product.title,
      price: product.discountedPrice,
      url: product.imageUrl,
      quantity: newQuantity,
      units: product.units,
      orderPrice: newQuantity * product.discountedPrice,
      subTotal: newQuantity * product.discountedPrice,
    });
  }
  const updatedCart = {
    items: updatedCartItems
  };
  this.cart = updatedCart;
  return this.save();
};


userSchema.methods.removeItem = function (product) {
  // console.log("PRODUCT in remove cart:- " + product);
  const cartProductIndex = this.cart.items.findIndex(cp => {
    return cp.productId.toString() === product._id.toString();
  });
  let newQuantity;
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    if (this.cart.items[cartProductIndex].quantity > 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity - 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
      updatedCartItems[cartProductIndex].orderPrice = newQuantity * product.discountedPrice;
      updatedCartItems[cartProductIndex].subTotal = newQuantity * product.discountedPrice;
    }
    if (this.cart.items[cartProductIndex].quantity == 0) {
      this.cart.items[cartProductIndex].remove();

      console.log("else cart product index" + this.cart.items[cartProductIndex]);
      return this.save();
    }
  }
  // if(cartProductIndex <= 0){ 
  //   this.cart.items = updatedCartItems - 1;
  //   console.log("if cart ");
  // }
  const updatedCart = {
    items: updatedCartItems
  };
  this.cart = updatedCart;
  return this.save();
};


userSchema.methods.removeFromCart = function (productId) {
  const updatedCartItems = this.cart.items.filter(item => {
    return item.productId.toString() !== productId.toString();
  });

  this.cart.items = updatedCartItems - 1;
  console.log("Remove from cart:- " + updatedCartItems);
  return this.save();
};

userSchema.methods.clearCart = function () {
  this.cart = { items: [] };
  return this.save();
};


module.exports = mongoose.model('User', userSchema);
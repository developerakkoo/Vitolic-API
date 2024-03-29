const fs = require("fs");
const path = require("path");

const APIFeatures = require('../Utils/ApiFeature');
const Product = require("../Models/productModel");

const { validationResult } = require("express-validator");
const AppError = require("../Utils/app.Error");

const io = require('../socket');





exports.searchProduct = async (req, res, next) => {
  try {
    const query = req.params.query;

    const regex = new RegExp(query, 'i');

    const product = await Product.find({ title: regex });

    if (!product) {
      res.status(402).json({
        statusCode: 402,
        message: "Product not Found",
      })

      io.getIO().emit('product:notfound', { action: 'notfound' })
    }

    res.status(200).json({
      statusCode: 200,
      message: "Product Found buy search results",
      product
    })

    io.getIO().emit('product:search', { product: product })


  } catch (error) {
    res.status(401).json({ error: error });
  }
}

exports.getProducts = async (req, res, next) => {

  try {
    const query = req.query.query;
    const term = req.query.term;

    console.log(query + term);
    const features = await new APIFeatures(Product.find().populate('quantity'), req.query)
      .filter()
      .sort()

    const products = await features.query;

    // try {
    //   if(query){
    //     const products = await Product.find()
    //                                 .select('-createdAt');
    //   }


    //   const products = await Product.find().where('title').equals('One')
    //                                 .sort({'price':-1})
    //                                 .select('-createdAt');

    res.status(200).json({
      status: "success",
      statusCode: 200,
      results: products.length,
      products: products,
    });

    io.getIO().emit('product:get', { products: products });


  } catch (err) {
    next(new AppError(err.message, 401));
  }
};

exports.getSingleProduct = async (req, res, next) => {
  try {
    const prodId = req.params.productId;

    const product = await Product.findById(prodId).populate("quantity");

    if (!product) {
      res.status(404).json({
        status: "error",
        message: "Product not found"
      });


    }
    res.status(200).json({
      status: "success",
      products: product
    })

    io.getIO().emit('product:get', { product: product })

  } catch (error) {
    res.status(401).json({
      message: error.message,
      status: "error",
    });
  }
}

exports.postAddProduct = (req, res, next) => {


  const host = req.hostname;

  if (!req.file) {
    res.status(404).json({
      status: false,
      message: 'Please provide a image'
    })
  }
  const title = req.body.title;
  const price = req.body.price;
  const discountedPrice = req.body.discountedPrice;
  const descriptionOne = req.body.descOne;
  const descriptionTwo = req.body.descTwo;
  const descriptionThree = req.body.descThree;
  const hasDiscountedPrice = req.body.hasDiscountedPrice;
  const inStock = req.body.inStock;
  const type = req.body.type;
  const stock = req.body.stock;
  const units = req.body.units;
  const quantity = req.body.quantity;
  const category = req.body.category;
  const imageFilePath = req.file.path.replace(/\\/g, "/");


  const imageUrl = req.file.path.replace(/\\/g, "/");
  console.log(imageUrl);

  const product = new Product({
    title: title,
    price: price,
    discountedPrice: discountedPrice,
    inStock: inStock,
    stock: stock,
    units: units,
    category: category,
    type: type,
    hasDiscountedPrice: hasDiscountedPrice,
    descriptionOne: descriptionOne,
    descriptionTwo: descriptionTwo,
    descriptionThree: descriptionThree,
    imageFilePath: imageFilePath,
    imageUrl: "https" + '://' + req.hostname + '/' + imageUrl
  });
  product.quantity.push(quantity);

  product.save().then((result) => {
    console.log("Product Created!");

    res.status(201).json({
      result,
      message: "Product Created",
    });
    io.getIO().emit('product:get', { product: product })


  }).catch((err) => {
    res.status(500).json({
      status: false,
      message: err.message
    })
  })
};

exports.addProductQuantity = async (req, res, next) => {
  try {
    const prodId = req.params.productId;

    const quantity = req.body.quantity;

    const product = await Product.findByIdAndUpdate(prodId, { $push: { quantity: quantity } });
    if (product) {
      res.status(201).json({ status: true, message: 'Product Quantity updated successfully', product });
    }

  } catch (error) {
    res.status(500).json({
      status: false,
      message: err.message
    })
  }
}

exports.productPriceChange = async (req, res, next) => {
  try {
    const prodId = req.params.productId;

    const product = await Product.findByIdAndUpdate(prodId, req.body);
    if (product) {
      res.status(200).json({ status: true, message: 'Product Price updated successfully', product });
    }

  } catch (error) {
    res.status(500).json({
      status: false,
      message: err.message
    })
  }
}


exports.postEditProduct = (req, res, next) => {
  const prodId = req.params.productId;

  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedDiscountedPrice = req.body.discountedPrice;
  let updatedImageUrl = req.body.imageUrl;
  const updatedInStock = req.body.inStock;
  const units = req.body.units;

  const updatedType = req.body.type;
  const updatedStock = req.body.stock;
  const updatedCategory = req.body.category;

  const descriptionOne = req.body.descOne;
  const descriptionTwo = req.body.descTwo;
  const descriptionThree = req.body.descThree;

  console.log("updated Image ", updatedImageUrl);

  if (req.file) {
    updatedImageUrl = "https" + '://' + req.hostname + '/' + req.file.path.replace(/\\/g, "/");
    console.log("ImageUrl set to ", updatedImageUrl);
  }



  Product.findByIdAndUpdate(prodId)
    .then((product) => {

      if (!product) {
        next(new Error("Product not found to edit"));
      }

      //Delete the image from directory if image is updated
      if (updatedImageUrl !== product.imageUrl) {
        clearImage(product.imageFilePath);
        console.log("Deleting image");
      }

      product.title = updatedTitle;
      product.price = updatedPrice;
      product.discountedPrice = updatedDiscountedPrice;
      product.inStock = updatedInStock;
      product.type = updatedType;
      product.stock = updatedStock;
      product.descriptionOne = descriptionOne,
      product.descriptionTwo = descriptionTwo,
      product.descriptionThree = descriptionThree,
      product.category = updatedCategory;
      product.imageUrl = updatedImageUrl;
      product.units = units;



      return product.save();

    }).then(result => {
      console.log(result);
      res.status(201).json({ status: 'success', data: result });
      io.getIO().emit('product:get', { product: product })


    }).catch(err => {
      console.log(err);
      res.status(500).json({ status: 'error', data: err.message });
    })
};

exports.postEditProductWithoutImage = (req, res, next) => {
  const prodId = req.params.productId;

  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedDiscountedPrice = req.body.discountedPrice;
  let updatedImageUrl = req.body.imageUrl;
  const updatedInStock = req.body.inStock;
  const units = req.body.units;

  const updatedType = req.body.type;
  const updatedStock = req.body.stock;
  const updatedCategory = req.body.category;

  const descriptionOne = req.body.descOne;
  const descriptionTwo = req.body.descTwo;
  const descriptionThree = req.body.descThree;
  console.log("updated Image ", updatedImageUrl);

  // if (req.file) {
  //   updatedImageUrl = req.protocol + '://' + req.hostname + '/' + req.file.path.replace(/\\/g, "/");
  //   console.log("ImageUrl set to ", updatedImageUrl);
  // }



  Product.findByIdAndUpdate(prodId)
    .then((product) => {

      if (!product) {
        next(new Error("Product not found to edit"));
      }

      // //Delete the image from directory if image is updated
      // if (updatedImageUrl !== product.imageUrl) {
      //   clearImage(product.imageFilePath);
      //   console.log("Deleting image");
      // }

      product.title = updatedTitle;
      product.price = updatedPrice;
      product.discountedPrice = updatedDiscountedPrice;
      product.inStock = updatedInStock;
      product.type = updatedType;
      product.stock = updatedStock;
      product.category = updatedCategory;
      product.imageUrl = updatedImageUrl;
      product.descriptionOne = descriptionOne,
      product.descriptionTwo = descriptionTwo,
      product.descriptionThree = descriptionThree,
      product.units = units;



      return product.save();

    }).then(result => {
      console.log(result);
      res.status(201).json({ status: 'success', data: result });
      io.getIO().emit('product:get', { product: product })


    }).catch(err => {
      console.log(err);
      res.status(500).json({ status: 'error', data: err.message });
    })
};




exports.postDeleteProduct = async (req, res, next) => {

  try {
    const prodId = req.params.productId;
    const product = await Product.findByIdAndDelete(prodId);

    if (!product) {
      res.status(404).json({
        message: "Product not found"
      })
    }

    clearImage(product.imageFilePath);


    res.status(200).json({
      status: "success",
      message: "Product deleted successfully"
    })

    io.getIO().emit('product:get', { product: product })




  } catch (error) {
    res.status(404).json({
      status: 'error',
      error: error.message
    })
  }

};

exports.updateStock = async (req, res, next) => {
  try {
    const id = req.params.id;
    const quantity = req.body.quantity;
    

    //1. Find the Product
    let product = await Product.findById(id);


    //2. Check for its stock
    console.log(product.stock);
    console.log(product.inStock);
    //3. If stock is 0 then set inStock to false
    if(product.stock <= 0){
      console.log("Product stock is 0 set value to false and send res");
      product.inStock = false;
      product.stock = 0;
      product.save();
      if (product) {
        res.status(200).json({ product, stock: product.stock, message: 'product found' })
      }
    }


    //4. Else minus the quantity from stock
    if(product.stock > 0){
      console.log("Product minus quantity");
      let product = await Product.findOneAndUpdate({ _id: id }, { $inc: { stock: -quantity } });
      if (product) {
        res.status(200).json({ product, stock: product.stock, message: 'product found' })
      }

    }

 

   
  } catch (error) {
    res.status(500).json({ error, message: 'Something went wrong!' });
  }
}

const clearImage = (filePath) => {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};

const Pet = require('./../Models/petProductModal');

exports.PetProductFilter = async(req, res,next) => {
    try {
        const query = req.params.query;

        const regex = new RegExp(query,'i');
  
        const product = await Pet.find({title: regex});
  
        if(!product){
          res.status(402).json({
            statusCode: 402,
            message: "Product not Found",
            })
  
            io.getIO().emit('product:notfound', {action: 'notfound'})
        }
  
        res.status(200).json({
          statusCode: 200,
          message: "Product Found buy search results",
          product})
  
          io.getIO().emit('product:search', {product: product})
       

        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


exports. postPetProduct = async(req, res,next) => {
  
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
        const inStock = req.body.inStock;
        const subCategory = req.body.subCategory;
        const stock = req.body.stock;
        const units = req.body.units;
        const quantity = req.body.quantity;
        const mainCategory = req.body.mainCategory;
        const imageFilePath = req.file.path.replace(/\\/g, "/");
        const imageUrl = req.file.path.replace(/\\/g, "/");
        console.log(imageUrl);
        

        const product = new Pet({   
            title: title,
            price: price,
            discountedPrice: discountedPrice,
            inStock: inStock,
            stock: stock,
            units: units,
            quantity: quantity,
            mainCategory : mainCategory,
            subCategory: subCategory,
            imageFilePath: imageFilePath,
            imageUrl: req.protocol + '://' + req.hostname +":" + process.env.PORT + '/' +  imageUrl
        });
        //product.quantity.push(quantity);

        product.save().then((result) => {
            console.log("Product Created!");
            
            res.status(201).json({
                result,
                message: "Product Created",
            });
          io.getIO().emit('product:create', {action: 'created', product})

        }).catch((err) => {
          res.status(500).json({
            status: false,
            message: err.message
        })
        })
};

exports.getPetProduct = async(req, res,next) => {
    try {
        const product = await Pet.find({}).populate("PetProduct");

       /*  if(product){
            res.status(200).json({ status: true, message:'product fetched successfully', product: product })
            io.getIO().emit('get:product', product);

        }  
    } catch (error) {
        res.status(500).json({message: error.message});
    } */
    if (product) {
        res.status(200).json({ product, message: 'Product found' })
    }
} catch (error) {
    res.status(500).json({ error, message: 'Something went wrong!' });
}

}

exports.getPetProductById = async(req, res,next) => {
    try {
        const id = req.params.id;

        const product = await Pet.findById(id);

        if(product){
            res.status(200).json({ status: true, message:'Product Found', product: product })
            io.getIO().emit('getById:product', product);

        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

exports.updatePetProduct = async(req, res,next) => {
    try {
        const id = req.params.id;

        const product = await Pet.findByIdAndUpdate(id, req.body);


        if(product){
            res.status(200).json({ status: true, message:'Product updated successfully', product: product })
            io.getIO().emit('put:product', product);
        }

        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


exports.updateStock = async(req, res,next) => {
    try {
        const id = req.params.id;
        const quantity = req.body.quantity;
        let product = await Pet.findOneAndUpdate({_id: id}, {$inc:{ stock : -quantity }});
       
       /*  //const product = await Pet.findOneAndUpdate({
       //     _id: id
       // }, {$inc: {stock : quantity}});
       // console.log(product);
            /* if(product){

              res.status(200).json({ status: true, message:'Product updated successfully', product })
             io.getIO().emit('put:product', product);
           }
    } catch (error) {
        res.status(500).json({message: error.message, error});
    }  */

    if (product) {
        res.status(200).json({ product, message: 'product found' })
    }
} catch (error) {
    res.status(500).json({ error, message: 'Something went wrong!' });
}
}


exports.deletePetProduct = async(req, res,next) => {
    try {
        const id = req.params.id;

        const product = await Pet.findByIdAndDelete(id);

        if(product){
            res.status(200).json({ status: true, message:'Product deleted successfully', product: product })
            io.getIO().emit('delete:product', product);
        }

        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
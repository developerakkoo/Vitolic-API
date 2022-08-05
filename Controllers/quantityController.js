const Quantity = require('../Models/quantityModal');
const Product = require("../Models/productModel");


exports.PostQuantity = async (req, res, next) => {
    try {
        const body = req.body;

        let productId = req.body.productId;


        const quantity = await Quantity.create(body);
        const product = await Product.findByIdAndUpdate(productId, {
            $push: {
                quantity: quantity._id
            }
        }, { new: true }, (err, doc) => {
            if (err) {

                res.status(404).json({ message: 'Product not found', error: err, response: doc, quantityId: doc._id });

            }

            res.status(200).json({ quantity: quantity, success: true, message: 'Quantity created successfully' })

        });
    } catch (error) {
        res.status(500).json({
            error: error, message: error.message, devMessage: "Something went wrong"
        });
    }
}

const GetQuantityById = async (req, res, next) => {
    try {
        let quantityId = req.params.id;

        if (quantityId) {
            res.status(200).json({ success: true, quantityId })
        }


    } catch (error) {
        res.status(500).json({
            error: error, message: error.message, devMessage: "Something went wrong"
        });
    }
}

const GetQuantityByProductId = async (req, res, next) => {
    try {
        let productId = req.params.productId;
        let product = await Product.find({});
        if (product) {
            res.status(200).json({ success: true, product })
        }
    } catch (error) {
        res.status(500).json({
            error: error, message: error.message, devMessage: "Something went wrong"
        });
    }
}

const PutQuantity = async (req, res, next) => {
    try {
        let quantityId = req.params.id;
        if (quantityId) {
            res.status(200).json({ success: true, productId })
        }

    } catch (error) {
        res.status(500).json({
            error: error, message: error.message, devMessage: "Something went wrong"
        });
    }
}

const DeleteQuantity = async (req, res, next) => {
    try {
        let quantityId = req.params.id;

    } catch (error) {
        res.status(500).json({
            error: error, message: error.message, devMessage: "Something went wrong"
        });
    }
}
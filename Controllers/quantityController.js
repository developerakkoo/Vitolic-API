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

exports.GetQuantityById = async (req, res, next) => {
    try {
        let quantityId = req.params.id;
        let quantity = await Quantity.findById(quantityId);
        if (quantity) {
            res.status(200).json({ success: true, quantity })
        }
    } catch (error) {
        res.status(500).json({
            error: error, message: error.message, devMessage: "Something went wrong"
        });
    }
}

exports.GetQuantityByProductId = async (req, res, next) => {
    try {
        let productId = req.params.productId;
        let quantity = await Quantity.findById(productId);//Product schema or quantity schema?

        if (quantity) {
            res.status(200).json({ success: true, quantity })
        }
    } catch (error) {
        res.status(500).json({
            error: error, message: error.message, devMessage: "Something went wrong"
        });
    }
}

exports.PutQuantity = async (req, res, next) => {
    try {
        let quantityId = req.params.id;
        const quantity = await Quantity.findByOneAndUpdate({ _id: quantityId }, req.body);
        if (quantity) {
            res.status(200).json({ success: true, quantity })
        }

    } catch (error) {
        res.status(500).json({
            error: error, message: error.message, devMessage: "Something went wrong"
        });
    }
}

exports.DeleteQuantity = async (req, res, next) => {
    try {
        let quantityId = req.params.id;
        const quantity = await Quantity.findByIdAndDelete(quantityId);
        if (quantity) {
            res.status(200).json({ success: true, quantity })
        }
    } catch (error) {
        res.status(500).json({
            error: error, message: error.message, devMessage: "Something went wrong"
        });
    }
}
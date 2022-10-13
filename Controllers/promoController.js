const Promo = require('./../Models/promoModel');


exports.createPromo = async (req, res, next) => {
    try {
        let promo = await Promo.create(req.body);

        if (promo) {
            res.status(200).json({ success: true, promo })
        }
    } catch (error) {
        res.status(500).json({ message: error.message, devMessage: "Something went wrong!" });
    }
}

exports.getPromo = async (req, res, next) => {
    try {

        let promo = await Promo.find({});
        if (promo) {
            res.status(200).json({ success: true, promo })

        }

    } catch (error) {
        res.status(500).json({ message: error.message, devMessage: "Something went wrong!" });
    }
}

exports.getPromoByUserId = async (req, res, next) => {
    try {
        let userId = req.params.userId
        let promo = await Promo.findById(userId);

        if (promo) {
            res.status(200).json({ success: true, promo })

        }

    } catch (error) {
        res.status(500).json({ message: error.message, devMessage: "Something went wrong!" });
    }
}

exports.updatePromo = async (req, res, next) => {
    try {
        const id = req.params.id;
        let promo = await Promo.findByIdAndUpdate(id, req.body);

        if (promo) {
            res.status(200).json({ success: true, message: "Updated promo" })

        }

    } catch (error) {
        res.status(500).json({ message: error.message, devMessage: "Something went wrong!" });
    }
}

exports.deletePromo = async (req, res, next) => {
    try {
        const id = req.params.id;
        let promo = await Promo.findByIdAndDelete(id);

        if (promo) {
            res.status(200).json({ success: true, message: "Deleted promo" })

        }

    } catch (error) {
        res.status(500).json({ message: error.message, devMessage: "Something went wrong!" });
    }
}
const Pincode = require('./../Models/pincodeModal');

exports.createPincode = async (req, res, next) => {
    try {
        const areaName = req.body.areaName;
        const pincode = req.body.pincode;

        const pincodes = new Pincode({
            areaName,
            pincode,
        })

        pincodes.save().then((result) => {
            res.status(200).send(result);
        })
    } catch (error) {
        res.status(500).json({ message: error.message, devMessage: "Something went wrong!" });
    }
}

exports.getPincodes = async (req, res, next) => {
    try {
        let pincode = await Pincode.find({});

        if (pincode) {
            res.status(200).json({ success: true, count:pincode.length, pincode })
        }
    } catch (error) {
        res.status(500).json({ message: error.message, devMessage: "Something went wrong!" });
    }
}




exports.updatePincode = async (req, res, next) => {
    try {
        const id=req.params.id;
        //const pincode = req.body.pincode;

        let pincodes = await Pincode.findOneAndUpdate(id);

        if (pincodes) {
            res.status(200).json({ success: true, pincodes })
        }
    } catch (error) {
        res.status(500).json({ message: error.message, devMessage: "Something went wrong!" });
    }
}


exports.deletePincode = async (req, res, next) => {
    try {
        let pincode = await Pincode.findByIdAndDelete(req.params.id);

        if (pincode) {
            res.status(200).json({ success: true, pincode })
        }

    } catch (error) {
        res.status(500).json({ message: error.message, devMessage: "Something went wrong!" });
    }
}
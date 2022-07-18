const pincode = require('./../Models/pincodeModal');

exports.createPincode = async(req, res, next) =>{
    try {
        let pincode = await pincode.create(req.body);

        if(pincode){
            res.status(200).json({success: true, pincode})
        }
    } catch (error) {
        res.status(500).json({message: error.message, devMessage:"Something went wrong!"});
    }
}

exports.getPincodes = async(req, res, next) =>{
    try {
        let pincode = await pincode.find({});

        if(pincode){
            res.status(200).json({success: true, pincode})
        }
    } catch (error) {
        res.status(500).json({message: error.message, devMessage:"Something went wrong!"});
    }
}


exports.updatePincode = async(req, res, next) =>{
    try {
        let pincode = await pincode.findOneAndUpdate(req.params.id,
            req.body);

        if(pincode){
            res.status(200).json({success: true, pincode})
        }
    } catch (error) {
        res.status(500).json({message: error.message, devMessage:"Something went wrong!"});
    }
}


exports.deletePincode = async(req, res, next) =>{
    try {
        let pincode = await pincode.findByIdAndDelete(req.params.id);

        if(pincode){
            res.status(200).json({success: true, pincode})
        }
        
    } catch (error) {
        res.status(500).json({message: error.message, devMessage:"Something went wrong!"});
    }
}
const coupon = require('./../Models/couponModal');

exports.createCoupon = async(req, res, next) =>{
    try {
        let coupon = await coupon.create(req.body);

        if(coupon){
            res.status(200).json({success: true, coupon})
        }
    } catch (error) {
        res.status(500).json({message: error.message, devMessage:"Something went wrong!"});
    }
}

exports.getCoupons = async(req, res, next) =>{
    try {

        let coupon = await coupon.find({});
        if(coupon){
            res.status(200).json({success: true, coupon})

        }
        
    } catch (error) {
        res.status(500).json({message: error.message, devMessage:"Something went wrong!"});
    }
}


exports.getCouponById = async(req, res, next) =>{
    try {
        const id= req.params.id;
        let coupon = await coupon.findById(id);
        if(coupon){
            res.status(200).json({success: true, coupon})

        }
    } catch (error) {
        res.status(500).json({message: error.message, devMessage:"Something went wrong!"});
    }
}


exports.deleteCoupon = async(req, res, next) =>{
    try {
        const id= req.params.id;
        let coupon = await coupon.findByIdAndDelete(id);

        if(coupon){
            res.status(200).json({success: true, message:"Deleted Coupon"})

        }
        
    } catch (error) {
        res.status(500).json({message: error.message, devMessage:"Something went wrong!"});
    }
}
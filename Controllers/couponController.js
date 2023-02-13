const Coupon = require('./../Models/couponModal');

exports.createCoupon = async(req, res, next) =>{
    try {
        let coupon = await Coupon.create(req.body);

        if(coupon){
            res.status(200).json({success: true, coupon})
        }
    } catch (error) {
        res.status(500).json({message: error.message, devMessage:"Something went wrong!"});
    }
}

exports.getCoupons = async(req, res, next) =>{
    try {

        let coupon = await Coupon.find({});
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
        let coupon = await Coupon.findById(id);
        if(coupon){
            res.status(200).json({success: true, coupon})

        }
    } catch (error) {
        res.status(500).json({message: error.message, devMessage:"Something went wrong!"});
    }
}

exports.getCouponByUserId = async(req, res, next) =>{
    try {
        const id= req.params.id;
        let coupon = await Coupon.find({userId: id});
        if(coupon){
            res.status(200).json({success: true, coupon})

        }
    } catch (error) {
        res.status(500).json({message: error.message, devMessage:"Something went wrong!"});
    }
}

exports.updateCoupon = async(req, res, next) =>{
    try {
        const id= req.params.id;
        let coupon = await Coupon.findByIdAndUpdate(id,req.body);

        if(coupon){
            res.status(200).json({success: true, message:"Updated Coupon"})

        }
        
    } catch (error) {
        res.status(500).json({message: error.message, devMessage:"Something went wrong!"});
    }
}

exports.deleteCoupon = async(req, res, next) =>{
    try {
        const id= req.params.id;
        let coupon = await Coupon.findByIdAndDelete(id);

        if(coupon){
            res.status(200).json({success: true, message:"Deleted Coupon"})

        }
        
    } catch (error) {
        res.status(500).json({message: error.message, devMessage:"Something went wrong!"});
    }
}
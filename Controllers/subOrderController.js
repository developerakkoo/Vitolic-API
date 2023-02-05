const subOrder = require('./../Models/subOrderModel');

exports.getTodaysOrders = async(req, res,next) =>{
    try {
        let mainOrderId = req.params.mainOrderId;
        let today = req.params.today;
        let pincode = req.params.pincode;

        let sub = await subOrder.find({orderDate: today, pincode: pincode  }).populate("subscription billId")

        if(sub){
            res.status(200).json({
                sub,
                subId: sub._id,
                message:"Sub Order Fetched Successfully"
            })
        }


    } catch (error) {
        res.status(500).json({
            status: false,
            message: error
        })
    }
}

exports.getSubOrders = async(req, res,next) =>{
    try {
     

        let sub = await subOrder.find({})

        if(sub){
            res.status(200).json({
                sub,
                length: sub.count,
                message:"Sub Orders Fetched Successfully"
            })
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Error Fetching SubOrders"
        })
    }
}

exports.deleteSubOrder = async(req, res,next) =>{
    try {
     
        let id = req.params.id;
        let sub = await subOrder.findByIdAndDelete(id);

        if(sub){
            res.status(200).json({
                sub,
                message:"Sub Orders Deleted Successfully"
            })
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Error Deleting SubOrders"
        })
    }
}
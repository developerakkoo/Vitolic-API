const Address = require('./../Models/addressModel');
const User = require('./../Models/userModel');

const io = require('./../socket');


exports.postAddress = async(req, res, next) => {
    try{
            const userId = req.body.userId;
            const addLine1 = req.body.addLine1;
            const addLine2 = req.body.addLine2;
            const state = req.body.state;
            const city = req.body.city;
            const landmark = req.body.landmark;
            const society = req.body.society;
            const pincode = req.body.pincode; 
            const coordinates = req.body.coordinates;
            
            
            const add = await Address.create(req.body);

            if(!add){
                res.status(500).json({message: 'Address Create Error'})
            }

            res.status(200).json({
                add: add,
                message: 'Address created Successfully',
            })
        }
    catch(err){
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
}



exports.getAddressById = async(req, res, next) => {
    try{
        const id = req.params.id;

        const add = await Address.findById(id);

        if(add){
            res.status(200).json({
                add,
                
                message: 'Address Found'
            })
        }
        console.log(add);
    }
    catch(err){
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
}

exports.getAddressByUserId = async(req, res, next) => {
    try{
        const userId = req.params.userId;

        const add = await Address.find({userId: userId});

        if(add){
            res.status(200).json({
                add,
                
                message: 'Address Found'
            })
        }
        console.log(add);
    }
    catch(err){
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
}

exports.updateAddress = async(req, res, next) => {
    try{
        const id = req.params.id;
        const add = await Address.findByIdAndUpdate(id, req.body);

        if(add){
            res.status(200).json({status: true, add, message: 'Address Updated'})
        }
        io.getIO.emit('add:update',{address: add});
        return;
    }
    catch(err){
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
}


exports.deleteAddress = async(req, res, next) => {
    try{
        const id = req.params.id;

        const add = await Address.findByIdAndDelete(id);

        if(add){
            res.status(200).json({add, message: 'Address Deleted Successfully'})
        }
    }
    catch(err){
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
}

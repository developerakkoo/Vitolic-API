const Admin = require('.././Models/adminModel');

const isAdmin = async (req,res,next) =>{
    try{
        const savedAdmin = await Admin.findById({_id:req.params.id});
        if(!savedAdmin){
            return res.status(400).json({message:"user doesn't have a admin access"})
        }
        next();
    }catch(err){
        return res.status(500).json({message:"something went wrong"})
    }

}


module.exports = {isAdmin}
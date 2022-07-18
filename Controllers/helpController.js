const help = require('./../Models/helpModal');

exports.createHelp = async(req, res, next) =>{
    try {
        let help = await help.create(req.body);
        if(help){
            res.status(200).json({success: true, help,
                message: "help created successfully"})
        }
    } catch (error) {
        res.status(500).json({message: error.message, devMessage:"Something went wrong!"});
    }
}

exports.getHelp = async(req, res, next) =>{
    try {
        let help = await help.find({});
        if(help){
            res.status(200).json({success: true, help,
                message: "help fetched"})
        }
    } catch (error) {
        res.status(500).json({message: error.message, devMessage:"Something went wrong!"});
    }
}


exports.getHelpByUserId = async(req, res, next) =>{
    try {
        let help = await help.find({userId: req.params.id});
        if(help){
            res.status(200).json({success: true, help,
                message: "help by userId"})
        }
    } catch (error) {
        res.status(500).json({message: error.message, devMessage:"Something went wrong!"});
    }
}


exports.deleteHelp = async(req, res, next) =>{
    try {
        let help = await help.findOneAndDelete({_id: req.params.id});

        if(help){
            res.status(200).json({success: true, help,
                message: "help deleted"})
        }
        
    } catch (error) {
        res.status(500).json({message: error.message, devMessage:"Something went wrong!"});
    }
}
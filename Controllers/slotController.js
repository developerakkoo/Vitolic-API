const Slot = require('../Models/slotModel');
const io = require('../socket');


exports.postSlot = async(req, res, next) => {
    try {
        const slot = await Slot.create(req.body);

        if(slot){
            res.status(200).json({ status: true, message:'Slot created successfully', slot: slot })
            io.getIO().emit('post:slot', slot);
        }
    } catch (error) {
        res.status(404).json({ status: false,  error: error, message: error.message });
    }
}


exports.getSlot = async(req, res, next) => {
    try {
        const slot = await Slot.find({}).populate("orders");

        if(slot){
            res.status(200).json({ status: true, message:'Slot fetched successfully', slot: slot })
            io.getIO().emit('get:slot', slot);
        }
    } catch (error) {
        res.status(404).json({ status: false,  error: error, message: error.message });
    }
}

exports.getSlotById = async(req, res, next) => {
    try {

        const id = req.params.id;

        const slot = await Slot.findById(id);

        if(slot){
            res.status(200).json({ status: true, message:'Slot Found', slot: slot })
            io.getIO().emit('getById:slot', slot);
        }
    } catch (error) {
        res.status(404).json({ status: false,  error: error, message: error.message });
    }
}

exports.assignSlot = async(req, res, next) => {
    try {
        const id = req.params.id;
        const orderId = req.params.orderId;

       Slot.findByIdAndUpdate(id, { 
            $addToSet:{
                orders: orderId
            }, 
            $inc: {slotAvailable: 1}
        }).then((slot) => {
            res.status(201).json({
                status: true, message: 'Assigned order to Slot', 
                slot
            })
        }).catch((error) => {
        res.status(404).json({ status: false,  error: error, message: error.message });

        })

    } catch (error) {
        res.status(404).json({ status: false,  error: error, message: error.message });
        
    }
}

exports.getSlotByDate = async(req, res, next) => {
    try {
        var startDate = new Date(req.params.date) // this is the starting date that looks like ISODate("2014-10-03T04:00:00.188Z")

        startDate.setSeconds(0);
        startDate.setHours(0);
        startDate.setMinutes(0);
        
        var dateMidnight = new Date(startDate);
        dateMidnight.setHours(23);
        dateMidnight.setMinutes(59);
        dateMidnight.setSeconds(59);


        // const date = req.params.date;
        // let inputDate = new Date(date).toISOString();

        const slot = await Slot.find({createdAt:{
            $gt: startDate,
            $lte: dateMidnight
        }});

        if(slot){
            res.status(200).json({ status: true, message:'Slot Found', slot: slot })
            io.getIO().emit('getByDate:slot', slot);
        }
    } catch (error) {
        res.status(404).json({ status: false,  error: error, message: error.message });
    }
}


exports.putSlot = async(req, res, next) => {
    try {
        const id = req.params.id;

        const slot = await Slot.findByIdAndUpdate(id, req.body);


        if(slot){
            res.status(200).json({ status: true, message:'Slot updated successfully', slot: slot })
            io.getIO().emit('put:slot', slot);
        }
    } catch (error) {
        res.status(404).json({ status: false,  error: error, message: error.message });
    }
}


exports.deleteSlot = async(req, res, next) => {
    try {

        const id = req.params.id;

        const slot = await Slot.findByIdAndDelete(id);

        if(slot){
            res.status(200).json({ status: true, message:'Slot deleted successfully', slot: slot })
            io.getIO().emit('delete:slot', slot);
        }
    } catch (error) {
        res.status(404).json({ status: false,  error: error, message: error.message });
    }
}
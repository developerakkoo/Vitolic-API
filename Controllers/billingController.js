const Bill = require('./../Models/billingModel');
const io = require('../socket');

exports.postBill = async (req, res, next) => {


    const amount = req.body.amount;
    const product = req.body.product;
    const paymentStatus = req.body.paymentStatus;


    const bill = new Bill({
        amount,
        product,
        paymentStatus

    });
    bill.save().then((result) => {
        console.log("Bill Created!");

        res.status(201).json({
            result,
            message: "Bill Created",
        });
        io.getIO().emit('Bill:create', { action: 'created', bill })

    }).catch((err) => {
        res.status(500).json({
            status: false,
            message: err.message
        })
    })
};

exports.getBill = async (req, res, next) => {
    try {
        const bill = await Bill.find({}).sort({ createdAt: -1 });

        if (bill) {

            res.status(200).json({ status: true, message: 'bill fetched successfully', bill: bill })
            io.getIO().emit('get:bill', bill);

        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

    /*    if (category) {
           res.status(200).json({ category, message: 'category found' })
       }
   } catch (error) {
       res.status(500).json({ error, message: 'Something went wrong!' });
   }
*/
}

exports.getBillById = async (req, res, next) => {
    try {
        const id = req.params.id;

        const bill = await Bill.findById(id).populate('userId');

        if (bill) {
            res.status(200).json({ bill, message: 'bill found' })
        }
    } catch (error) {
        res.status(500).json({ error, message: 'Something went wrong!' });
    }
}

exports.getBillByUserId = async (req, res, next) => {
    try {
        const id = req.params.id;

        const bill = await Bill.find({userId:id});

        if (bill) {
            res.status(200).json({ bill, message: 'bill found' })
        }
    } catch (error) {
        res.status(500).json({ error, message: 'Something went wrong!' });
    }
}

exports.getBillByInvoice = async (req, res, next) => {
    try {
        const id = req.params.invoiceNumber;

        const bill = await Bill.find(id).populate('userId');

        if (bill) {
            res.status(200).json({ bill, message: 'bill found' })
        }
    } catch (error) {
        res.status(500).json({ error, message: 'Something went wrong!' });
    }
}

exports.getBillByDate = async (req, res, next) => {
    try {

        let startDate = req.body.startDate;
        let endDate = req.body.endDate;

        const bill = await Bill.find({ "createdAt": { $gte: startDate, $lte: endDate } });

        if (bill) {

            res.status(200).json({ status: true, message: 'bill fetched successfully', count: bill.length, bill: bill })
            io.getIO().emit('get:bill', bill);

        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getBillByWeek = async (req, res, next) => {
    try {


        const bill = await Bill.find({
            "createdAt": {
                $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000)
            }
        });

        if (bill) {

            res.status(200).json({ status: true, message: 'bill fetched successfully', count: bill.length, bill: bill })
            io.getIO().emit('get:bill', bill);

        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getBillByMonth = async (req, res, next) => {
    try {


        const bill = await Bill.find({
            "createdAt": {
                $gte: new Date(new Date() - 30 * 60 * 60 * 24 * 1000)
            }
        });

        if (bill) {

            res.status(200).json({ status: true, message: 'bill fetched successfully', count: bill.length, bill: bill })
            io.getIO().emit('get:bill', bill);

        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}




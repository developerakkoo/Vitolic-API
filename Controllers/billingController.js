const Bill = require('./../Models/billingModel');
const io = require('../socket');

exports.postBill = async (req, res, next) => {


    const amount = req.body.amount;
    const product = req.body.product;
    const paymentStatus=req.body.paymentStatus;


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

         if(bill){
             res.status(200).json({ status: true, message:'bill fetched successfully', bill: bill })
             io.getIO().emit('get:bill', bill);
 
         }  
     } catch (error) {
         res.status(500).json({message: error.message});
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




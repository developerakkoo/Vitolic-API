const CartModel = require('../Models/cartModel');
const User = require('../Models/userModel');
const Boy = require('../Models/DeliveryBoyModel');
const Product = require('../Models/productModel');

const io = require('../socket');

exports.getLiveUsers = async (req, res, next) => {
    /* try {

        const user = await User.find({});
        user = await user.isOnline ? res.status(200).json({
            status: true,
            count: user.length,
        }) : console.log("No User is Online");
        let { isOnline } = user[0];
        console.log(isOnline)
        //let isDelivered = user.isDelivered
        for (i = 0; i < user.length; i++) {

            if (user[i].isOnline == true) {

                res.status(200).json({
                    status: true,
                    count: user.length,
                })
                return;
            }
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error
        })
    } */
    try {
        const users = await User.find({}).populate('products');

        if (users) {
            res.status(200).json({
                message: 'All Users',
                users: users.length
            })
        }
    } catch (error) {
        res.status(500).json({ error, message: error.message })

    }
}

exports.getLiveBoys = async (req, res, next) => {
    /*  try {
 
         const user = await Boy.find({});
         user = await user.isOnline ? res.status(200).json({
             status: true,
             count: user.length
         }) : console.log("No Delivery Boy is Online");
     } catch (error) {
         res.status(500).json({
             status: false,
             message: error
         })
     } */
    try {

        const boy = await Boy.find({});

        if (boy) {
            res.status(200).json({
                message: 'User Found',
                boy: boy.length
            })
        }
    } catch (err) {
        res.status(500).json({ error: err.message, message: 'Something went wrong!' })

    }

}

exports.getTotalOrders = async (req, res, next) => {
    try {

        const cart = await CartModel.find({}).sort({ _id: -1 }).populate("userId address");
        let { isDelivered } = cart;
        console.log(isDelivered)
        //let isDelivered = cart.isDelivered
        for (i = 0; i < cart.length; i++) {

            if (cart[i].isDelivered == false) {

                res.status(200).json({
                    status: true,
                    count: cart.length,
                })
                return;
            }
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error
        })
    }
}

exports.getEarning = async (req, res, next) => {
    try {

        const cart = await CartModel.find();

        if (cart) {
            CartModel.aggregate([{ $match: {} }, {
                $group:
                    { _id: null, sum: { $sum: "$total" } }
            }])
                .then(result => res.status(200).json({
                    status: true,
                    total: (result[0].sum)
                }));
        }

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error
        })
    }
}

exports.getEarningByMonth = async (req, res, next) => {
    try {

        const cart = await CartModel.find();

        if (cart) {
            CartModel.aggregate([
                {
                    $group: {
                        _id: { month: { $month: { $toDate: "$createdAt" } } },
                        earnings: { $sum: '$total' }
                    }
                },
                { $sort: { month: -1 } }
            ])
                .then(result => res.status(200).json({
                    status: true,
                    result
                }));
        }

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error
        })
    }
}

exports.sortOrders = async (req, res, next) => {
    try {

        const cart = await CartModel.find();

        if (cart) {
            CartModel.aggregate([
                {
                    $group: {
                        _id: { month: { $month: { $toDate: "$createdAt" } }, },
                        orders: { $sum: 1 }
                    }
                },
                { $sort: { orders: -1 } }
            ]).then(result =>
                res.status(200).json({
                    status: true,
                    result
                }));
        }

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error
        })
    }
}

exports.sortProducts = async (req, res, next) => {
    try {

        const cart = await Product.find();

        if (cart) {
            Product.aggregate([{ $match: {} },
            { $project: { _id: 0, 'title': 1, 'price': 1 } },
            { $sort: { 'price': -1 } }
            ]).then(result =>
                res.status(200).json({
                    status: true,
                    result
                }));
        }


    } catch (error) {
        res.status(500).json({
            status: false,
            message: error
        })
    }
}


exports.sortEarnings = async (req, res, next) => {
    try {

        const cart = await CartModel.find();

        if (cart) {
            CartModel.aggregate([{ $match: {} }, { $unwind: '$products' },
            { $project: { _id: 0, 'products.title': 1, 'products.price': 1 } },
            { $sort: { 'products.price': -1 } }
            ]).then(result =>
                res.status(200).json({
                    status: true,
                    result
                }));
        }

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error
        })
    }
}

/* exports.earnings = async (req, res, next) => {
    let oneYearFromNow = "2019-04-07T00:00:00";
    let dateNow = "2020-04-06T23:59:59";
    const monthStrings = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    CartModel.aggregate([
        {
            $match: {
                // Match only salses with a specific productId

                // Match only salses that fufils the date constraint below
                $expr: {
                    $and: [
                        { $gt: ["$created_at", oneYearFromNow] },
                        { $lt: ["$created_at", dateNow] }
                    ],
                }
            }
        },
        {
            $group: {
                // Group by both month and year of the sale
                _id: {
                    month: { $month: "$created_at" },
                    year: { $year: "$created_at" },
                },
                // Count the no of sales
                count: {
                    $sum: 1
                }
            }
        },
        // Adding a project here to just to format the group date better
        {
            $project: {
                _id: {
                    $concat: [
                        {
                            $arrayElemAt: [
                                monthStrings,
                                "$_id.month"
                            ]
                        },
                        "-",
                        "$_id.year"
                    ]
                },
                count: 1,
            }
        }
    ]).then(result =>
        res.status(200).json({
            status: true,
            result
        }));
} */
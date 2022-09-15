const Cart = require('../Models/cartModel');
const io = require('../socket');
const User = require('../Models/userModel');
const Product = require('../Models/productModel');

exports.getCartByCartId = async (req, res, next) => {
    try {

        const cart = await Cart.findById(req.params.id).populate("userId address");

        if (cart) {
            res.status(200).json({
                status: true,
                count: cart.length,

                cart
            })
        }


    } catch (error) {
        res.status(500).json({
            status: false,
            message: error
        })
    }
}

exports.getCartByUserId = async (req, res, next) => {
    try {

        const cart = await Cart.find({ userId: req.params.id }).populate("userId address");

        if (cart) {
            res.status(200).json({
                status: true,
                count: cart.length,

                cart
            })
        } else { console.log("not found") }

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error
        })
    }
}

exports.getCart = async (req, res, next) => {
    try {

        const cart = await Cart.find({}).sort({ _id: -1 }).populate("userId address");
        //let { isDelivered } = cart;
        //console.log(isDelivered)
        //let isDelivered = cart.isDelivered
        for (i = 0; i < cart.length; i++) {

            if (cart[i].isDelivered == false) {

                res.status(200).json({
                    status: true,
                    count: cart.length,

                    cart
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error
        })
    }

}


exports.addToCart = async (req, res, next) => {
    try {
        const { userId, products, total, status, address } = req.body;

        console.log("ADD TO CART METHOD");
        let cart = new Cart({
            products: products,
            userId: userId,
            total: total,
            status: status,
            address: address
        });
        await cart.save();

        if (cart) {
            res.status(200).json({
                cart,
                message: 'Cart added successfully'
            })
        }

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }

}



exports.updateCart = async (req, res, next) => {
    try {
        const id = req.params.id;

        const cart = await Cart.findByIdAndUpdate(id, req.body);

        if (cart) {
            res.status(200).json({ cart, message: 'cart updated' })
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}


exports.deleteCart = async (req, res, next) => {
    try {
        const id = req.params.id;
        let cart = await Cart.findByIdAndDelete(id);
        if (cart) {
            res.status(200).send("Cart Delete Successfully");
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

exports.orderDelivered = async (req, res, next) => {
    try {
        const cartId = req.params.id
        const cart = await Cart.findById({ _id: cartId });

        if (cart) {
            res.status(200).json({
                message: 'Order Delivered',
                cart
            })
            io.getIO().emit('order:delivered', cartId);

        }
    } catch (error) {
        res.status(500).json({ error, message: 'Something went wrong!' })

    }
}

exports.orderStatus = async (req, res, next) => {
    try {
        const cartId = req.params.id
        const cart = await Cart.findById({ _id: cartId });
        //let delivered= await
        cart = await cart.updateOne(isDelivered, { isDelivered: true });
        console.log(cart);

        /* let user = await User.findById(id);

        let subEndDate = await user.isMonth ? moment().add(30, 'd').toDate() : moment().add(60, 'd').toDate();
    
        user = await user.updateOne({ endDate: subEndDate }); */
        if (cart) {

            res.status(200).json({

                cart
            })
            io.getIO().emit('status:Order delivered', cartId);

        }
    } catch (error) {
        res.status(500).json({ error, message: 'Something went wrong!' })

    }
}


exports.featured = async (req, res, next) => {
    try {

        const cart = await Cart.find();

        if (cart) {
            Cart.aggregate([{ $match: {} },
                {
                    "$unwind": "$products"
                  },
                  {
                    "$group": {
                      "_id": "$products.title",
                      
                      "totalOrdered": {
                        "$sum": "$products.amount"
                      }
                    }
                  },
                  {
                    "$sort": {
                      sum: -1
                    }
                  },
                  
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


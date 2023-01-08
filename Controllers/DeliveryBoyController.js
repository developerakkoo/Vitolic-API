const Boy = require('../Models/DeliveryBoyModel');
const Slot = require('../Models/slotModel');
const User = require('../Models/userModel');
const Cart = require('../Models/orderModel');
const SubCart = require('../Models/subOrderModel');

const Address = require('../Models/addressModel');

const PlacedOrder = require('../Models/placeOrderModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { AddressContext } = require('twilio/lib/rest/api/v2010/account/address');



exports.loginUser = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    let loadedUser;


    Boy.findOne({ email: email })
        .then(user => {
            if (!user) {
                res.status(400).json({ message: 'User not found', status: 'error' })
            }
            Boy.updateOne({ isOnline: true });
            console.log(user.isOnline);

            loadedUser = user;

            bcrypt.compare(password, user.password)
                .then(doMatch => {
                    if (!doMatch) {
                        res.status(400).json({ message: 'Password do not match', status: 'error' })
                        return;
                    }

                    const token = jwt.sign({
                        email: loadedUser.email,
                        userId: loadedUser._id.toString(),
                    }, "!23ThisisaSecretFor@#$%^%^^&&allthebest", { expiresIn: '3h' })



                    res.status(200).json({
                        message: 'Sign In Successfull',
                        token: token,
                        userId: loadedUser._id.toString(),
                        expiresIn: '3h'
                    })
                });
        }).catch(err => {
            res.status(500).json({ err, message: 'Something went wrong!' })

        })
}


exports.postSignup = (req, res, next) => {

    const fullName = req.body.fullName;
    const contactNumber = req.body.contactNumber;
    const email = req.body.email;
    const password = req.body.password;
    const cordinates = req.body.cordinates;
    const boyLandmark = req.body.boyLandmark;
    const boyPincode = req.body.boyPincode;

    Boy.findOne({ email: email })
        .then(user => {
            if (user) {
                res.status(400).json({
                    status: false,
                    message: 'User with email already exists. Please use another email.'
                })
            }

            bcrypt.hash(password, 12)
                .then((hashedPasswords) => {
                    const user = new Boy({
                        email: email,
                        password: hashedPasswords,
                        fullName: fullName,
                        contactNumber: contactNumber,
                        cordinates: cordinates,
                        boyLandmark: boyLandmark,
                        boyPincode: boyPincode,
                    })

                    return user.save();
                }).then((result) => {
                    res.status(201).json({ message: 'User Created Successfully!', status: '201', userId: result._id });
                })
        })

        .catch(err => {
            res.status(500).json({ error: err.message, message: 'Something went wrong!' })
        })

}


exports.getBoyById = async (req, res, next) => {
    try {
        const id = req.params.id;

        const boy = await Boy.findById(id).populate("orders orders.productId slot");

        if (boy) {
            res.status(200).json({
                message: 'User Found',
                boy
            })
        }
    } catch (err) {
        res.status(500).json({ error: err.message, message: 'Something went wrong!' })

    }
}

exports.getBoys = async (req, res, next) => {
    try {

        let pincode = req.body.pincode;
        const boy = await Boy.find({ boyPincode: pincode });

        if (boy) {
            res.status(200).json({
                message: 'User Found',
                boy
            })
        }
    } catch (err) {
        res.status(500).json({ error: err.message, message: 'Something went wrong!' })

    }
}

exports.updateBoyById = async (req, res, next) => {
    try {
        const id = req.params.id;

        const boy = await Boy.findByIdAndUpdate(req.body);
        console.log(boy);
        if (boy) {
            res.status(201).json({ message: 'User updated Successfully', boy });
        }
    } catch (err) {
        res.status(500).json({ error: err.message, message: 'Something went wrong!' })

    }
}


exports.deleteBoyById = async (req, res, next) => {
    try {
        const id = req.params.id;

        const boy = await Boy.findByIdAndDelete(id);

        if (boy) {
            res.status(200).json({
                message: 'User Deleted Successfully',
                boy
            })
        }
    } catch (err) {
        res.status(500).json({ error: err.message, message: 'Something went wrong!' })

    }
}

exports.getBoyAndAssignOrder = async (req, res, next) => {
    try {
        const id = req.params.id;
        const slotId = req.params.slotId;
        const orderId = req.params.orderId;

        Boy.findByIdAndUpdate(id, {
            $addToSet: { orders: orderId, slot: slotId }
        }, { upsert: true }, (error, doc) => {
            if (error) {
                res.status(404).json({ status: false, error: error, message: error.message })
            }

            res.status(200).json({
                status: true,
                message: "Assigned order to Delivery Boy",
                doc
            })
        })



    } catch (error) {
        res.status(500).json({ error: err.message, message: 'Something went wrong!' })

    }
}

exports.getOrders = async (req, res, next) => {
    try {

        let boys = await Boy.find({}, "boyLandmark").sort({ createdAt: -1 });
        //let [ _id]  = boys;
        //console.log(_id)
        let deliveryLandmark = [];
        let orderLandmark = [];

        if (boys) {
            for (i = 0; i < boys.length; i++) {
                let { boyLandmark } = boys[i]
                deliveryLandmark.push(boyLandmark)
                //console.log(boyLandmark)
            }
            let orders = await Cart.find({}, "address").sort({ createdAt: -1 });

            //console.log(address)
            for (i = 0; i < orders.length; i++) {
                let { address } = orders[i];
                if (address) {
                    const add = await Address.findById({ _id: address });
                    let { landmark } = add;
                    orderLandmark.push(landmark)

                    //console.log(landmark)
                }
                // console.log(address)
            }

            //if(boyLandmark==landmark)console.log(landmark)
        }
        //console.log(deliveryLandmark, orderLandmark)
        const result = orderLandmark.map(order => {
            const addressItem = deliveryLandmark.find(boy => boy === order)

            order.boy = addressItem
                ? addressItem.boy
                : null

            return order
        })

        console.log(result)

        /* for (var i = 0; i < deliveryLandmark.length; i++)
            if (deliveryLandmark[i] == orderLandmark[i])
                console.log(orderLandmark) */
        /* for (i = 0; i < deliveryLandmark.length; i++) {
            for (j = 0; j < orderLandmark; j++) {
                if (deliveryLandmark[i] == orderLandmark[j]) {
                    console.log(orderLandmark)
                }
            }
        } */
        /* if (deliveryLandmark == orderLandmark) {
            console.log("hello")
        } */
        //console.log(orders)
        /* let {address:{landmark,pincode}}=orders;
        console.log(landmark,pincode)
         orders = await Cart.find({},"landmark").sort({ createdAt: -1 }); */

        /* orders.foreach(element => console.log(element))
        let [address] = orders;
        let { landmark } = address
        console.log(landmark); */
        //console.log(orders);
        /* const result = orders.map(order => {
            const addressItem = boys.find(boy => boy.boyLandmark === order.landmark)
            
            order.boy = addressItem 
            ? addressItem.boy
            : null
            
            return order
          })
          
          console.log(result) */
        /* 
                let op = boy.map((e,i)=>{
                    let temp = orders.find(element=> element.landmark === e.boyLandmark)
                    if(temp.orders) {
                      e.orders = temp.orders;
                    }
                    return e;
                  })
                  console.log(op);
         */
        /* let [boyPincode, boyLandmark] = boy;
        console.log(boyPincode, boyLandmark)
        let [pincode, landmark] = orders;
        let userpin = orders.pincode;
        let usermark = orders.landmark;
        console.log(pincode, landmark)
 */
        /* for (i = 0; i < orders.length; i++) {
            console.log(orders[i])
        } */
        //console.log(orders.landmark[i])

        if (boys) {
            res.status(200).json({
                message: 'Orders retreived Successfully',
                boys,

            })
        }
    } catch (err) {
        res.status(500).json({ error: err.message, message: 'Something went wrong!' })

    }
}

exports.getOrderForDeliveryToday = async (req, res, next) => {
    try {
        let date = req.body.date;    //order date to show to delivery boy
        let pincode = req.body.pincode;   //delivery boy pincode

        const subcart = await SubCart.find({
            pincode: pincode, orderDate: date
        })

        if (subcart) {
            io.getIO().emit('cart:get', cart);
            res.status(200).json({
                status: true,
                count: cart.length,
                cart
            })
        } else {
            res.status(400).json({
                status: false,
                message: "No Order found for today"
            })
        }

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error
        })
    }

}
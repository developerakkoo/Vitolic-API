const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

const multer = require("multer");
const mongoose = require("mongoose");
const morgan = require("morgan");
const swaggerUi = require('swagger-ui-express');

//modal
const Cart = require("./Models/orderModel");
const Product = require("./Models/productModel");
const User = require("./Models/userModel");
const PlaceOrder = require('./Models/placeOrderModel')

//Routes
const adminRoute = require("./Routes/adminRoute");
const dashboardRoute = require("./Routes/dashboardRoute");
//const customDateRoute= require("./Routes/customDateRoute")
const productRoute = require("./Routes/productRoute");
const quantityRoute = require("./Routes/quantityRoute");
const userRoute = require("./Routes/userRoute");
const userOrdersRoute = require("./Routes/userOrdersRoute");
const userAuthRoute = require("./Routes/userAuthRoute");
const placeRoute = require("./Routes/placeOrderRoute");
const orderRoute = require("./Routes/paymentRoute");
const addressRoute = require("./Routes/addressRoute");
const boyRoute = require("./Routes/DeliveryBoyRoute");
const slotRoute = require("./Routes/slotroute");
const cartRoute = require("./Routes/orderRoute");
const couponRoute = require("./Routes/cuponRoute");
const pincodeRoute = require("./Routes/pincodeRoute");
const bannerRoute = require("./Routes/bannerRoute");
const helpRoute = require("./Routes/helpRoute");
const subAdminRoute = require("./Routes/subAdminRoute");
const refundRoute = require("./Routes/refundRoute");
const subscriptionRoute = require("./Routes/subscriptionRoute");
const petProductRoute = require("./Routes/petProductRoute");
const billRoute = require("./Routes/billingRoute");
const promoRoute = require("./Routes/promoRoute");
const cityRoute = require("./Routes/cityRoute");

//const categoryRoute = require("./Routes/categoryRoute");
//Error Handlers
const errorController = require("./Controllers/errorController");
const globalErrorHandler = require("./Utils/globalErrorHandler");
const AppError = require("./Utils/app.Error");
const swaggerJSDoc = require("swagger-jsdoc");
// const MONGODB_URI = "mongodb://localhost:27017/milkdelivery";
const MONGODB_URI = "mongodb+srv://farmsell:farmsell@cluster0.mh36s.mongodb.net/Vitolic?retryWrites=true&w=majority";
//const apicache = require('apicache');
//const cache = apicache.middleware;


//excel


const app = express();
const port = 8080;
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.json());
app.use(cors());
/* app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
}); */
/* app.use((req, res, next) => {
  //allow access to current url. work for https as well
  res.setHeader('Access-Control-Allow-Origin', req.header('Origin'));
  res.removeHeader('x-powered-by');
  //allow access to current method
  res.setHeader('Access-Control-Allow-Methods', req.method);
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
}) */


app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
//apicache
/* app.use(cache('7 days'))
 
app.get('/will-be-cached', (req, res) => {
  res.json({ success: true })
}) */
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Vitolic API Docs",
      version: "v1",
    },

  },
  apis: ['app.js', './Routes/productRoute.js', './Routes/orderRoute.js',
    './Routes/addressRoute.js', './Routes/adminRoute.js', './Routes/bannerRoute.js',
    './Routes/cartRoute.js', './Routes/couponRoute.js', './Routes/DeliveryBoyRoute.js',
    './Routes/helpRoute.js', './Routes/pincodeRoute.js', './Routes/placeOrderRoute.js',
    './Routes/quantityRoute.js', './Routes/refundRoute.js', './Routes/slotRoute.js',
    './Routes/userRoute.js', './Routes/userOrdersRoute.js', './Routes/userAuthRoute.js', './Routes/subAdminRoute.js',
    './Routes/subscriptionRoute.js']
}

const swaggerDocs = swaggerJSDoc(swaggerOptions);
dotenv.config({
  path: "./config.env",
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "image");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname.replace(/\\/g, "/"));
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(
  multer({ storage: diskStorage, fileFilter: fileFilter }).single("file")
);

app.use("/image", express.static(path.join(__dirname, "image")));


app.get('/getgst/:gst', async(req, res, next) =>{
  let gst = req.params.gst;
  let mail = req.params.mail;

  var config = {
    method: 'get',
    url: `https://api.mastergst.com/public/search?email=mvk20@rediffmail.com&gstin=${gst}`,
    headers: { 
      'client_id': 'GSP4ea49af0-17d3-4df7-8aed-c620e4806b9c', 
      'client_secret': 'GSP286e85df-4313-43dd-9b54-fc79b81f5ffb'
    }
  };
  
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
    res.status(200).json({
      message: 'Gst API',
      gst,
      data: response.data
    })
  })
  .catch(function (error) {
    console.log(error);
    res.status(500).json({
      message: error,
      data: "Something went wrong!"
    })
  });

})
app.use(adminRoute);
app.use(billRoute);
//app.use(customDateRoute)
app.use(dashboardRoute);
app.use(productRoute);
app.use(userRoute);
app.use(userOrdersRoute);
app.use(placeRoute);
app.use(orderRoute);
app.use(userAuthRoute);
app.use(addressRoute);
app.use(boyRoute);
app.use(cartRoute);
app.use(slotRoute);
app.use(quantityRoute);
app.use(couponRoute);
app.use(helpRoute);
app.use(pincodeRoute);
app.use(bannerRoute);
app.use(subAdminRoute);
app.use(refundRoute);
app.use(subscriptionRoute);
app.use(promoRoute);
app.use(cityRoute);

// app.use(petProductRoute);
//app.use(categoryRoute);
app.use(globalErrorHandler);


app.use((err, req, res, next) => {
  console.log(err);
  const status = err.status || 500;
  const message = err.message;
  const data = err.data;

  res.status(status).json({
    message: message,
    data: data,
    error: err,
  });
});

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((result) => {
    const server = app.listen(8080);
    const io = require("./socket").init(server);

    io.on("connection", (socket) => {
      console.log("Connected a User");

      socket.on("disconnect", () => {
        console.log("User Disconnected");
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });

//Route is in placeOrderRoute.js



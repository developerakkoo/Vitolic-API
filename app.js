const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");

const { v4: uuidv4 } = require("uuid");

const multer = require("multer");
const mongoose = require("mongoose");
const morgan = require("morgan");
const swaggerUi = require('swagger-ui-express');

//modal
const Cart = require("./Models/cartModel");
const Product = require("./Models/productModel");
const User = require("./Models/userModel");

//Routes
const adminRoute = require("./Routes/adminRoute");
const productRoute = require("./Routes/productRoute");
const quantityRoute = require("./Routes/quantityRoute");
const userRoute = require("./Routes/userRoute");
const userAuthRoute = require("./Routes/userAuthRoute");
const placeRoute = require("./Routes/placeOrderRoute");
const orderRoute = require("./Routes/orderRoute");
const addressRoute = require("./Routes/addressRoute");
const boyRoute = require("./Routes/DeliveryBoyRoute");
const slotRoute = require("./Routes/slotroute");
const cartRoute = require("./Routes/cartRoute");
const couponRoute = require("./Routes/cuponRoute");
const pincodeRoute = require("./Routes/pincodeRoute");
const bannerRoute = require("./Routes/bannerRoute");
const helpRoute = require("./Routes/helpRoute");
const subAdminRoute = require("./Routes/subAdminRoute");
const refundRoute = require("./Routes/refundRoute");
const subscriptionRoute = require("./Routes/subscriptionRoute");
const petProductRoute = require("./Routes/petProductRoute");
//const categoryRoute = require("./Routes/categoryRoute");
//Error Handlers
const errorController = require("./Controllers/errorController");
const globalErrorHandler = require("./Utils/globalErrorHandler");
const AppError = require("./Utils/app.Error");
const swaggerJSDoc = require("swagger-jsdoc");
// const MONGODB_URI = "mongodb://localhost:27017/milkdelivery";
const MONGODB_URI = "mongodb+srv://farmsell:farmsell@cluster0.mh36s.mongodb.net/Vitolic?retryWrites=true&w=majority";

const app = express();
const port = 8080;
app.use(express.json());
app.use(cors());


const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Vitolic API Docs",
      version: "v1",
    },

  },
  apis: ['app.js', './Routes/productRoute.js', './Routes/orderRoute.js', 
  './Routes/addressRoute.js', './Routes/adminRoute.js', './Routes/bannerRoute.js', 
  './Routes/cartRoute.js','./Routes/couponRoute.js','./Routes/DeliveryBoyRoute.js',
  './Routes/helpRoute.js','./Routes/pincodeRoute.js','./Routes/placeOrderRoute.js',
  './Routes/quantityRoute.js','./Routes/refundRoute.js','./Routes/slotRoute.js',
  './Routes/userRoute.js','./Routes/userAuthRoute.js','./Routes/subAdminRoute.js',
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

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.use(adminRoute);
app.use(productRoute);
app.use(userRoute);
app.use(placeRoute);
// app.use(orderRoute);
app.use(userAuthRoute);
app.use(addressRoute);
app.use(boyRoute);
app.use(cartRoute);
// app.use(slotRoute);
app.use(quantityRoute);
app.use(couponRoute);
app.use(helpRoute);
app.use(pincodeRoute);
app.use(bannerRoute);
app.use(subAdminRoute);
app.use(refundRoute);
app.use(subscriptionRoute);
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
    const server = app.listen(5000);
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

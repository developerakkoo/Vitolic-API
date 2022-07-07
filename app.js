const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

const { v4: uuidv4 } = require("uuid");

const multer = require("multer");
const mongoose = require("mongoose");
const morgan = require("morgan");

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
const boyRoute =require("./Routes/DeliveryBoyRoute");
const slotRoute = require("./Routes/slotroute");
//Error Handlers
const errorController = require("./Controllers/errorController");
const globalErrorHandler = require("./Utils/globalErrorHandler");
const AppError = require("./Utils/app.Error");

// const MONGODB_URI = "mongodb://localhost:27017/farmsell";
const MONGODB_URI = "mongodb+srv://farmsell:farmsell@cluster0.mh36s.mongodb.net/Farmsell?retryWrites=true&w=majority";

const app = express();
const port = 8080;

app.use(express.json());

dotenv.config({
  path: "./config.env",
});

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
app.use(orderRoute);
app.use(userAuthRoute);
app.use(addressRoute);
app.use(boyRoute);
app.use(slotRoute);
app.use(quantityRoute);
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

      socket.on("addtocart", async (data) => {
        const productId = data["productId"];
        const userId = data["userId"];
        console.log("addtocart " + data["productId"] + " " + userId);

        User.findById(userId)
          .then((user) => {
            // console.log("IO user found " + user);
            Product.findById(productId).then((product) => {
              // console.log("IO product found " + product);

              user.addToCart(product);

              socket.emit("cart", { cart: user.cart });
            });
          })
          .then((success) => {
            // console.log("Product Added IO" + success);
          })

          .catch((err) => {
            console.log(err);
          });
      });

      socket.on("removeFromCart", (data) => {
        const userId = data["userId"];
        const productId = data["productId"];

        // console.log("remove from cart " + data["productId"] + " " + userId);

        User.findById(userId)
          .then((user) => {
            // console.log("IO user found " + user);
            Product.findById(productId).then((product) => {
              // console.log("IO product found " + product);

              user.removeItem(product);
              socket.emit("removecart", { user });
            });
          })
          .then((success) => {
            // console.log("Product Removed IO" + success);
          })

          .catch((err) => {
            console.log(err);
          });
      });

      socket.on("disconnect", () => {
        console.log("User Disconnected");
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });
   
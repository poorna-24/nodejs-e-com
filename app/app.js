//imports
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import Stripe from "stripe";
import { globalErrHandler, notFound } from "../middlewares/globalErrHandler.js";
//file imports
import dbConnect from "../config/dbConnect.js";
import userRouter from "../routes/User.route.js";
import productRouter from "../routes/Product.route.js";
import categoriesRouter from "../routes/Category.router.js";
import brandsRouter from "../routes/brands.router.js";
import colorRouter from "../routes/colors.router.js";
import reviewRouter from "../routes/review.router.js";
import orderRouter from "../routes/orders.router.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import couponRouter from "../routes/coupon.router.js";
import Order from "../models/order.js";

dotenv.config();

//db connect
dbConnect();
const app = express();
app.use(cors());

const stripe = new Stripe(process.env.STRIPE_KEY);

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_48d09cb996b8e74df4445abbb5365a139f0379493b037e6a514d5ecb727f8f3d";

app.post("/webhook", express.raw({ type: "application/json" }), async (request, response) => {
  const sig = request.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    console.log("event");
  } catch (err) {
    console.log("err", err.message);
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  if (event.type === "checkout.session.completed") {
    //update the order
    const session = event.data.object;
    const { orderId } = session.metadata;
    const paymentStatus = session.payment_status;
    const paymentMethod = session.payment_method_types[0];
    const totalAmount = session.amount_total;
    const currency = session.currency;
    // console.log({
    //   orderId,
    //   paymentMethod,
    //   paymentStatus,
    //   totalAmount,
    //   currency,
    // });
    // find the order
    const order = await Order.findByIdAndUpdate(
      JSON.parse(orderId),
      {
        totalPrice: totalAmount / 100,
        currency,
        paymentMethod,
        paymentStatus,
      },
      {
        new: true,
      }
    );
    console.log(order);
  } else {
    return;
  }
  // // Handle the event
  // switch (event.type) {
  //   case "payment_intent.succeeded":
  //     const paymentIntentSucceeded = event.data.object;
  //     // Then define and call a function to handle the event payment_intent.succeeded
  //     break;
  //   // ... handle other event types
  //   default:
  //     console.log(`Unhandled event type ${event.type}`);
  // }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

//pass incoming data
app.use(express.json());

// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL,
//   })
// );
//stripe webhook

//to test user loggedin are not
app.get("/api/v1/test", isLoggedIn, (req, res, next) => {
  console.log(req.userAuthId);
  res.send("special");
});

//routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/categories", categoriesRouter);
app.use("/api/v1/brands", brandsRouter);
app.use("/api/v1/colors", colorRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/coupons", couponRouter);

//err middleware
app.use(notFound);
app.use(globalErrHandler);

// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || "internal server error";
//   return res.status(statusCode).json({ message, success: false });
// });

export default app;

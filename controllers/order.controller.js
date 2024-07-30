import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
import Order from "../models/order.js";
import User from "./../models/User.js";
import Product from "../models/Product.js";
import Coupon from "../models/Coupon.js";

//stripe instance
const stripe = new Stripe(process.env.STRIPE_KEY);
// const stripe = new Stripe(process.env.STRIPE_KEY, {
//   maxNetworkRetries: 0, // Disable retries
// });
// const stripe = new Stripe("sk_test_51PSfsCDz6Lvyhb8zvTrhYrOo1cUSLuWrFQSxY0CXWB0eGL1hWeGVepRmPHFkElcmwft3RtMowLYVh09pEBZehUPb00iAPcZPQQ");

export const createOrder = asyncHandler(async (req, res) => {
  //get coupon
  const { coupon } = req.query;

  const couponFound = await Coupon.findOne({
    code: coupon?.toUpperCase(),
  });
  if (couponFound?.isExpired) {
    throw new Error("coupon has expired");
  }
  if (!couponFound) {
    throw new Error("Coupon does not exists");
  }
  //get discount
  const discount = couponFound?.discount / 100;

  //get the payload(customer,orderItems,shippingAsddress,totalPrice)
  const { orderItems, shippingAddress, totalPrice } = req.body;
  // console.log(orderItems, shippingAddress, totalPrice);
  //find the user
  const user = await User.findById(req.userAuthId);
  //Check if user has shipping address
  if (!user?.hasShippingAddress) {
    throw new Error("Please provide shipping address");
  }
  //check if order is not empty
  if (orderItems?.length <= 0) {
    throw new Error("No Order items");
  }
  //place/create order --save to DB
  const order = await Order.create({
    user: user?._id,
    orderItems,
    shippingAddress,
    totalPrice: couponFound ? totalPrice - totalPrice * discount : totalPrice,
  });
  console.log(order);

  //update the product qty
  const products = await Product.find({ _id: { $in: orderItems } });

  orderItems?.map(async (order) => {
    const product = products?.find((product) => {
      return product?._id?.toString() === order?._id?.toString();
    });
    if (product) {
      product.totalSold += order.qty;
    }
    await product.save();
  });
  //push order into user
  user.orders.push(order?._id);
  await user.save();
  // make payment (stripe)
  //convert order items to have same structure that stripe need
  const convertedOrders = orderItems.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item?.name,
          description: item?.description,
        },
        unit_amount: item?.price * 100,
      },
      quantity: item?.qty,
    };
  });
  const session = await stripe.checkout.sessions.create({
    line_items: convertedOrders,
    metadata: {
      orderId: JSON.stringify(order?._id),
    },
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });
  res.send({ url: session.url });
  //   //payment webhooks
  //   //update the user order

  //   // res.json({ success: true, message: "order created", order, user });
});

//@desc get all orders
//@route GET /api/v1/orders
//@access private
export const getAllOrders = asyncHandler(async (req, res) => {
  const Orders = await Order.find();
  res.json({
    Success: true,
    message: "All orders",
    totalOrders: Orders.length,
    Orders,
  });
});

//@desc get single order
//@route GET /api/v1/orders/:id
//@access private/admin

export const getSingleOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  res.status(200).json({
    Success: true,
    message: " Single order details",
    totalOrders: order.length,
    order,
  });
});

//@desc update order to delivered
//@route PUT /api/v1/orders/update/:id
//@access private/admin

export const updateOrder = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    {
      new: true,
    }
  );
  res.status(200).json({
    success: true,
    message: "Order updated",
    order,
  });
});

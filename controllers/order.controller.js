import asyncHandler from "express-async-handler";
import Order from "../models/order.js";
import User from "./../models/User.js";
import Product from "../models/Product.js";

export const createOrder = asyncHandler(async (req, res) => {
  //get the payload(customer,orderItems,shippingAsddress,totalPrice)
  const { orderItems, shippingAddress, totalPrice } = req.body;
  // console.log(orderItems, shippingAddress, totalPrice);
  //find the user
  const user = await User.findById(req.userAuthId);
  //check if the user has shipping address
  if (user?.hasShippingAddress) {
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
    totalPrice,
  });
  // console.log(order);
  //push order into user
  user.orders.push(order._id);
  await user.save();
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
  //make payment (stripe)
  //payment webhooks
  //update the user order

  res.json({ success: true, message: "order controller", order, user });
});

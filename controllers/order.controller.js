import asyncHandler from "express-async-handler";
import Order from "../models/order.js";
import User from "./../models/User.js";
import Product from "../models/Product.js";

export const createOrder = asyncHandler(async (req, res) => {
  //Get the payload(customer, orderItems, shippingAddress, totalPrice);
  const { orderItems, shippingAddress, totalPrice } = req.body;

  //   const user = await User.findById(req.userAuthId);
  const user = await User.findById(req.userAuthId);
  //   console.log(user);
  if (!user?.hasShippingAddress) {
    throw new Error("Please provide shipping address");
  }

  if (orderItems?.length <= 0) {
    throw new Error("No ordered items");
  }

  const order = await Order.create({
    user: user?._id,
    orderItems,
    shippingAddress,
    totalPrice,
  });
  console.log(order);
  user.orders.push(order?._id);
  await user.save();
  //Update the product qty
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

  console.log(products);
  res.json({ success: true, message: "Order Created", order, user });
});

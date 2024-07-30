import User from "./../models/User.js";
import bcryptjs from "bcryptjs";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";
import { verifyToken } from "../utils/verifyToken.js";

// @desc    Register user
// @route   POST /api/v1/users/register
// @access  Private/Admin

export const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;

  //Check user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    //throw
    // res.json({ message: "User already exists" });
    throw new Error("User already exists");
  }
  //hash password
  const hashedPassword = bcryptjs.hashSync(password, 10);
  //create the user
  const user = await User.create({
    fullname,
    email,
    password: hashedPassword,
  });
  res.status(201).json({
    status: "success",
    message: "User Registered Successfully",
    data: user,
  });
});

//login user api
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //Find the user in db by email only
  const userFound = await User.findOne({
    email,
  });
  if (userFound && bcryptjs.compareSync(password, userFound?.password)) {
    res.json({
      status: "success",
      message: "User logged in successfully",
      userFound,
      token: generateToken(userFound?._id),
    });
  } else {
    // res.json({ message: "Invalid login credentials" });
    throw new Error("Invalid login credentials");
  }
});

// @desc    Get user profile
// @route   GET /api/v1/users/profile
// @access  Private

export const getUserProfileCtrl = asyncHandler(async (req, res) => {
  //find the user
  const user = await User.findById(req.userAuthId).populate("orders");
  res.json({
    status: "success",
    message: "User profile fetched successfully",
    user,
  });
});
//  const token = getTokenFromHeader(req);
//  // console.log(token);
//  //verify token
//  const verified = verifyToken(token);

//  // console.log(verified);

//  // console.log(req);

//  // console.log(req.headers);
//  //get token from header
//  // const headerObj = req?.headers?.authorization?.split(" ")[1];
//  // console.log(headerObj);
//  res.json({
//    message: "welcome to profile",
//  });
// @desc    Update user shipping address
// @route   PUT /api/v1/users/update/shipping
// @access  Private

export const updateShippingAddress = asyncHandler(async (req, res) => {
  const { firstName, lastName, address, city, postalCode, province, phone, country } = req.body;
  const user = await User.findByIdAndUpdate(
    req.userAuthId,
    {
      shippingAddress: {
        firstName,
        lastName,
        address,
        city,
        postalCode,
        province,
        phone,
        country,
      },
      hasShippingAddress: true,
    },
    {
      new: true,
    }
  );
  //send response
  res.json({
    status: "success",
    message: "User shipping address updated successfully",
    user,
  });
});

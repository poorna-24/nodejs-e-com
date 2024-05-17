import User from "./../models/User.js";
import bcryptjs from "bcryptjs";
// @desc    Register user
// @route   POST /api/v1/users/register
// @access  Private/Admin

export const registerUser = async (req, res) => {
  const { fullname, email, password } = req.body;

  //Check user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    //throw
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
};

// export const loginUser = async (req, res) => {
//   const { email, password } = req.body;
//   const validuser = await User.findOne({ email });

//   if (validuser && bcryptjs.compareSync(password, validuser?.password)) {
//     return res.json({ message: "login done" });
//   } else {
//     throw new Error("Invalid login credentials");
//   }
// };

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  //Find the user in db by email only
  const userFound = await User.findOne({
    email,
  });
  if (userFound && (await bcryptjs.compare(password, userFound?.password))) {
    res.json({
      status: "success",
      message: "User logged in successfully",
    });
  } else {
    throw new Error("Invalid login credentials");
  }
};

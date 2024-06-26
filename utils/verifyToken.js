import jwt from "jsonwebtoken";

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      return false;
      // return "Token expired/invalid";
    } else {
      // console.log(decoded);
      return decoded;
    }
  });
};

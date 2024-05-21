import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";
import { verifyToken } from "../utils/verifyToken.js";

export const isLoggedIn = (req, res, next) => {
  //get token from header
  const token = getTokenFromHeader(req);
  //verify the token
  const decodedUser = verifyToken(token);
  if (!decodedUser) {
    throw new Error("Invalid/Expired token, please login again");
  } else {
    //save the user into req obj
    //Token expired/invalid
    // { id: '664c592a5cec5f1f9cb70394', iat: 1716284613, exp: 1716288213 }
    req.userAuthId = decodedUser?.id;
    next();
  }
};

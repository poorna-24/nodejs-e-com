export const getTokenFromHeader = (req) => {
  const token = req?.headers?.authorization?.split(" ")[1];
  // console.log(token);
  if (token === undefined) {
    return false;
    // return "No token found in the header";
  } else {
    return token;
  }
};

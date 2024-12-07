const { verifyToken } = require("../configs/auth.config");

exports.checkAuth = async (req, res, next) => {
  const cookieToken = req.cookies.token;
  const headerToken = req.headers.authorization?.split(" ")[1];
  const token = cookieToken || headerToken;
  if(token){
    console.log("I GOT THE TOKEN");
  }

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const userDecoded = verifyToken(token);
  if (userDecoded.error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  req.user = userDecoded;
  console.log("I SET THE USER", req.user);
  next();
};

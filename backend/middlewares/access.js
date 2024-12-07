function giveAccess(roles = []) {
    return (req, res, next) => {
      const userRole = req.user.role;
      console.log("I GOT THE USER ROLE", userRole);
      if (roles.includes(userRole)) {
        next();
      } else {
        res
          .status(403)
          .send({
            status: "failed",
            message: "Not allowed to access this route",
          });
      }
    };
  }
  
module.exports = giveAccess;
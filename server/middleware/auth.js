const jwt = require("jsonwebtoken");
const User = require("../models/User");
const AppError = require("../utils/appError");
const asyncHandler = require("./async");

module.exports = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next(
          new AppError("The user belonging to token does not exist", 401)
        );
      }

      // check if user changed password after the token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next(
          new AppError(
            "User recently changed password! Please log in again.",
            401
          )
        );
      }

      // grant access to protected route
      req.user = currentUser;
      res.locals.user = currentUser;

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    return next(new AppError("Not authorized", 401));
  }
});

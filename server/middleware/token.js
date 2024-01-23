const jwt = require('jsonwebtoken');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
const saveCookie = (user, res) => {
  const token = signToken(user._id);

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') options.secure = true;

  res
    .status(200)
    .cookie('token', token, options)
    .json({ success: true, token });
};

module.exports = saveCookie;

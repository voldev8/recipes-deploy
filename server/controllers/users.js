const bcrypt = require('bcryptjs');
const asyncHandler = require('../middleware/async');
const saveCookie = require('../middleware/token');
// const AppError = require('../utils/appError');
const User = require('../models/User');

// Get logged in user
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('-password'); // we don't return the password
  res.status(200).json({ success: true, data: user });
});

// Update user details
exports.updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
  };
  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});

// Update password
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  // Check current password
  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) return res.status(401).json({ msg: 'Password is incorrect' });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.newPassword, salt);

  await user.save();

  res.status(200).json({
    success: true,
    data: user,
  });
  // saveCookie(user, res);
});

// Favorites
// Get Favorites
exports.getFav = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('-password'); // we don't return the password
  res.status(200).json({ success: true, data: user.favRecipes });
});

// Add recipe to Favorites
exports.addFav = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user.favRecipes.includes(req.body.recipeId)) {
    user.favRecipes.push(req.body.recipeId);
  }
  await user.save();
  res.status(200).json({ success: true, data: user });
});

// Remove recipe from Favorites
exports.removeFav = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (user.favRecipes.includes(req.body.recipeId)) {
    user.favRecipes.splice(user.favRecipes.indexOf(req.body.recipeId), 1);
  }
  await user.save();
  res.status(200).json({ success: true, data: user });
});

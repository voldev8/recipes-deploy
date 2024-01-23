const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const {
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,
} = require('../controllers/auth');

router.route('/signup').post(
  //express-validator checks
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  signup
);

router
  .route('/login')
  .post(
    [
      check('name', 'Please include a username').exists(),
      check('password', 'Password is required').exists(),
    ],
    login
  );

router.get('/logout', logout);

router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);

module.exports = router;

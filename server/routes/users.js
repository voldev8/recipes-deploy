const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getUser,
  updateDetails,
  updatePassword,
  getFav,
  addFav,
  removeFav,
} = require('../controllers/users');

router.route('/').get(auth, getUser);
router.route('/fav').get(auth, getFav).put(auth, addFav);
router.route('/addfav').put(auth, addFav);
router.route('/removefav').put(auth, removeFav);
router.route('/update').put(auth, updateDetails);
router.route('/updatepassword').put(auth, updatePassword);

module.exports = router;

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getRecipes,
  getRecipe,
  createRecipe,
  deleteRecipe,
  updateRecipe,
} = require('../controllers/recipes');

router.route('/').get(getRecipes).post(auth, createRecipe);
router.route('/:id').get(getRecipe).delete(deleteRecipe).put(updateRecipe);

module.exports = router;

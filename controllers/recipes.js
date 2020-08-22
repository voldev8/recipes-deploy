const Recipe = require('../models/Recipes');
const asyncHandler = require('../middleware/async');

// Get recipes
exports.getRecipes = asyncHandler(async (req, res, next) => {
  const recipes = await Recipe.find();

  if (!recipes) res.json({ success: false });
  res.status(200).json(recipes);
});

// Get one recipe
exports.getRecipe = asyncHandler(async (req, res, next) => {
  const recipe = await Recipe.findById(req.params.id);

  if (!recipe) return res.status(400).json({ success: false });
  res.status(200).json({ success: true, data: recipe });
});

// Create a recipe
exports.createRecipe = asyncHandler(async (req, res, next) => {
  const recipe = await Recipe.create(req.body);

  if (!recipe) return res.status(400).json({ success: false });
  res.status(200).json({ success: true, data: recipe });
});

// Update a recipe
exports.updateRecipe = asyncHandler(async (req, res, next) => {
  const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!recipe) return res.status(400).json({ success: false });
  res.status(200).json({ success: true, data: recipe });
});

// Delete a recipe
exports.deleteRecipe = asyncHandler(async (req, res, next) => {
  const recipe = await Recipe.findByIdAndDelete(req.params.id);
  const deleted_name = recipe.name;

  if (!recipe) return res.status(400).json({ success: false });
  res.status(200).json({ success: true, data: `${deleted_name} deleted.` });
});

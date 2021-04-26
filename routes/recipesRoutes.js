const express = require('express');
const recipesController = require('../controllers/recipesController');
const middlewares = require('../middlewares');

const router = express.Router();

const recipeId = '/recipes/:id';

router.post('/recipes',
  middlewares.validateRecipe,
  middlewares.authMiddleware,
  recipesController.addRecipe);

router.get('/recipes', recipesController.getRecipes);

router.get(recipeId, recipesController.getRecipeById);

router.put(recipeId,
  middlewares.authMiddleware,
  recipesController.updateRecipe);

router.delete(recipeId,
  middlewares.authMiddleware,
  recipesController.deleteRecipe);

router.use(middlewares.errorMiddleware);

module.exports = router;
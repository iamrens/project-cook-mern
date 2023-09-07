import express from "express";
import { verifyToken } from "../middleware/token.js"
import { getAllRecipe, createRecipe, getRecipe, getUserRecipes, savedRecipe, getAllSaved, likedRecipe, deleteRecipe, postRating, searchRecipes } from "../controller/recipe.js";

const router = express.Router();

// CREATE


// READ
router.route("/:recipeID").get(getRecipe);
router.route("/").get(getAllRecipe);
router.route("/all/:userID").get(getUserRecipes);
router.route("/saved/:userID").get(getAllSaved);
router.route("/search/:searchTerm").get(searchRecipes);

// UPDATE
router.route("/saved/:recipeID").patch(verifyToken, savedRecipe);
router.route("/liked/:recipeID").patch(verifyToken, likedRecipe);
router.route("/:recipeID/rating").patch(verifyToken, postRating);

// DELETE
router.route("/:recipeID").delete(verifyToken, deleteRecipe);

export default router;
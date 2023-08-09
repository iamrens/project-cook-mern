import express from "express";
import { verifyToken } from "../middleware/token.js"
import { getAllRecipe, createRecipe, getRecipe, getUserRecipes, savedRecipe, getAllSaved, likedRecipe, deleteRecipe } from "../controller/recipe.js";

const router = express.Router();

// CREATE


// READ
router.route("/:recipeID").get(verifyToken, getRecipe);
router.route("/").get(verifyToken, getAllRecipe);
router.route("/all/:userID").get(verifyToken, getUserRecipes);
router.route("/saved/:userID").get(verifyToken, getAllSaved)

// UPDATE
router.route("/saved/:recipeID").patch(verifyToken, savedRecipe);
router.route("/liked/:recipeID").patch(verifyToken, likedRecipe);

// DELETE
router.route("/:recipeID").delete(verifyToken, deleteRecipe);

export default router;
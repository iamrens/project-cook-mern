import express from "express";
import mongoose from "mongoose";
import User from "../models/User.js";
import Recipe from "../models/Recipe.js";

// Create a new recipe
export const createRecipe = async (req, res) => {
    try {
        const { name, description, ingredients, instructions, cookingTime, userOwner } = req.body;

        const user = await User.findById(userOwner);

        // Validation checks
        if(!user) throw new Error("User not found. Please signin.");
        if (req.file && !['image/jpg', 'image/png', 'image/jpeg'].includes(req.file.mimetype)) {
            throw new Error('Invalid image format.');
        }
        if (req.file && req.file.size > 2097152) {
            throw new Error("Image must be less than 2mb");
        }

        let imagePath = "";
        if (req.file && req.file.path) {
            imagePath = req.file.path;
        }

        const newRecipe = new Recipe({
            _id: new mongoose.Types.ObjectId(),
            name,
            description,
            ingredients,
            instructions,
            imagePath,
            cookingTime,
            userOwner,
            likes: {},
            comments: [],
        })

        await newRecipe.save();

        const recipe = await Recipe.find().sort({ createdAt: -1 });
        res.status(201).json(recipe);

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// Get all recipe
export const getAllRecipe = async (req, res) => {
    try {
        const recipes = await Recipe.find().sort({ createdAt: -1 });
        res.status(200).json(recipes);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// Get one recipe by ID
export const getRecipe = async (req, res) => {
    try {
        const { recipeID } = req.params;
        const recipe = await Recipe.findById(recipeID);

        if (!recipe) {
            throw new Error("Recipe not found.")
        }

        res.status(200).json(recipe);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// Get user's all recipe
export const getUserRecipes = async (req, res) => {
    try {
        const { userID } = req.params;

        const recipes = await Recipe.find({ userOwner: userID }).sort({ createdAt: -1 });
        
        res.status(200).json(recipes);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// Update a recipe
export const updateRecipe = async (req, res) => {
    try {
        const { recipeID } = req.params;
        const { name, description, ingredients, instructions, cookingTime, userOwner } = req.body;

        const user = await User.findById(userOwner);
        const recipe = await Recipe.findById(recipeID)

        // Validation checks
        if (!user) throw new Error("User not found. Please signin.");
        if (!recipe) throw new Error("Recipe not found.");
        if (recipe.userOwner.toString() !== userOwner) throw new Error("User not authorized to update this recipe.");
        if (req.file && !['image/jpg', 'image/png', 'image/jpeg'].includes(req.file.mimetype)) {
            throw new Error('Invalid image format.');
        };
        if (req.file && req.file.size > 2097152) {
            throw new Error("Image must be less than 2mb");
        };

        // Check if there is an image on the request
        let imagePath = recipe.imagePath;
        if (req.file && req.file.path) {
            imagePath = req.file.path;
        }

        // Update recipe contents
        recipe.name = name;
        recipe.description = description;
        recipe.ingredients = ingredients;
        recipe.instructions = instructions;
        recipe.cookingTime = cookingTime;

        const updatedRecipe = await recipe.save();

        res.status(200).json(updatedRecipe);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

// Delete a recipe
export const deleteRecipe = async (req, res) => {
    try {
        const { recipeID } = req.params;
        const { userID } = req.body;

        const recipe = await Recipe.findById(recipeID);
        const user = await User.findById(userID);

        console.log(recipe.userOwner.toString(), userID)

        const id1 = recipe.userOwner.toString()
        const id2 = userID

        if(id1 === id2) {
            console.log("they are the same")
        } else {
            console.log("they are different")
        }

        // Validation checks
        if (!user) throw new Error("User not found. Please signin.");
        if (!recipe) throw new Error("Recipe not found.");
        if (recipe.userOwner.toString() !== userID) throw new Error("User not authorized to delete this recipe.");

        await Recipe.findByIdAndDelete(recipeID);
        const updatedRecipes = await Recipe.find().sort({ createdAt: -1 });

        res.status(200).json(updatedRecipes);
    } catch (err) {
        res.status(404).json({ message: err.message });
        
    }
};

// Like a recipe
export const likedRecipe = async (req, res) => {
    try {
        const { recipeID } = req.params;
        const { userID } = req.body;

        const user = await User.findById(userID);
        const recipe = await Recipe.findById(recipeID);

        // Check if the user or recipe exist
        if (!user) throw new Error("User not found. Please signin.");
        if (!recipe) throw new Error("Recipe not found.");

        // Check if the recipe is already liked
        const isLiked = recipe.likes.has(userID);

        if (isLiked) {
            // Delete the recipe from the saved recipes
            recipe.likes.delete(userID);
        } else {
            // Add the recipe from the saved recipes
            recipe.likes.set(userID, true)
        }

        const updatedRecipe = await Recipe.findByIdAndUpdate(
            recipeID,
            { likes: recipe.likes },
            { new: true }
        )

        res.status(200).json(updatedRecipe);

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// Save a recipe
export const savedRecipe = async (req, res) => {
    try {
        const { recipeID } = req.params;
        const { userID } = req.body;

        const user = await User.findById(userID);

        // Check if the user exists
        if (!user) throw new Error("User not found. Please signin.");

        // Check if the recipe is already saved
        const isSaved = user.savedRecipes.has(recipeID);

        if (isSaved) {
            // Delete the recipe from the saved recipes
            user.savedRecipes.delete(recipeID);
        } else {
            // Add the recipe from the saved recipes
            user.savedRecipes.set(recipeID, true)
        }

        const updatedUser = await User.findByIdAndUpdate(
            userID,
            {savedRecipes: user.savedRecipes},
            { new: true }
        )

        res.status(200).json(updatedUser);

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// Get all saved recipes
export const getAllSaved = async (req, res) => {
    try {
        const { userID } = req.params;
        const user = await User.findById(userID);

        // Check if the user exists
        if (!user) throw new Error("User not found. Please sign in.");

        // Get an array of recipeIDs from the user's savedRecipes Map
        const savedRecipeIDs = Array.from(user.savedRecipes.keys());

        const savedRecipes = await Recipe.find({ _id: { $in: savedRecipeIDs } });

        res.status(200).json(savedRecipes);

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
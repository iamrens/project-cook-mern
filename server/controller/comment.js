import express from "express";
import mongoose from "mongoose";
import User from "../models/User.js";
import Recipe from "../models/Recipe.js";
import Comment from "../models/Comment.js";

// Create a comment
export const createComment = async (req, res) => {
    try {
        const { recipeID } = req.params
        const { content, userOwner } = req.body;

        const user = await User.findById(userOwner);
        const recipe = await Recipe.findById(recipeID).populate("comments");

        // Validation checks
        if (!user) throw new Error("User not found. Please signin.")
        if (!recipe) throw new Error("Recipe not found.")

        const newComment = new Comment({
            content,
            userOwner,
            recipePath: recipeID
        })

        // Save comment in a separate db
        await newComment.save();

        // Push the comment in the recipe array
        recipe.comments.push(newComment);

        // Save the recipe
        const updatedRecipe = await recipe.save();

        res.status(200).json(updatedRecipe);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// Update a comment
export const updateComment = async (req, res) => {
    try {
        const { commentID, recipeID } = req.params;
        const { content, userOwner } = req.body;

        const user = await User.findById(userOwner);
        const recipe = await Recipe.findById(recipeID).populate("comments");
        const comment = await Comment.findById(commentID);

        // Validation checks
        if (!user) throw new Error("User not found. Please signin.");
        if (!recipe) throw new Error("Recipe not found.");
        if (!comment) throw new Error("Comment not found.");
        if (comment.userOwner.toString() !== userOwner) throw new Error("User not authorized to update this comment.");

        // Update comment contents
        comment.content = content;


        const updatedRecipe = await recipe.save(); // Save the updated comments in the recipe DB
        await comment.save(); // Save the updated comments in DB

        res.status(200).json(updatedRecipe);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// Delete a comment
export const deleteComment = async (req, res) => {
    try {
        const { commentID, recipeID } = req.params;
        const { userOwner } = req.body;

        const user = await User.findById(userOwner);
        const recipe = await Recipe.findById(recipeID).populate("comments");
        const comment = await Comment.findById(commentID);

        // Validation checks
        if (!user) throw new Error("User not found. Please signin.");
        if (!recipe) throw new Error("Recipe not found.");
        if (!comment) throw new Error("Comment not found.");
        if (comment.userOwner.toString() !== userOwner) throw new Error("User not authorized to delete this comment.");

        // Delete the comments in the recipe DB and comment DB
        await Comment.findByIdAndDelete(commentID);
        recipe.comments.pull(commentID);

        await recipe.save();

        res.status(200).json(recipe);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
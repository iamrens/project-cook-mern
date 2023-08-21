import express from "express";
import mongoose from "mongoose";
import User from "../models/User.js";
import Recipe from "../models/Recipe.js";

// Get a single user
export const getUser = async (req, res) => {
    try {
        const { userID } = req.params;
        const user = await User.findById(userID);

        if (!user) throw new Error("User not found.")

        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// Get user followers or following
export const getUserFollow = async (req, res) => {
    try {
        const { userID, connection } = req.params;
        const user = await User.findById(userID);

        if (!user) throw new Error("User not found.")

        const connectionID = connection === "followers"
            ? Array.from(user.followers.keys())
            : Array.from(user.following.keys());

        const follow = await User.find({ _id: { $in: connectionID } });

        res.status(200).json(follow);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// Toggling followers and following function
export const toggleFollow = async (req, res) => {
    try {
        const { userID, otherID } = req.params;

        const user = await User.findById(userID);
        const otherUser = await User.findById(otherID);

        // Validation checks
        if (!user) throw new Error("User not found. Please signin.");
        if (!otherUser) throw new Error("User not found.");
        if (userID === otherID) throw new Error("User cannot follow himself.")

        // A = user, B = other user.
        // If A follow B: A follower will not change, A following is B.
        // B follower will be A, B following will not change.
        const isFollowing = user.following.has(otherID);
        const isFollower = otherUser.followers.has(userID);

        if (isFollowing || isFollower) {
            user.following.delete(otherID);
            otherUser.followers.delete(userID);
        } else {
            user.following.set(otherID, true);
            otherUser.followers.set(userID, true);
        }

        const updatedUser = await User.findByIdAndUpdate(
            userID,
            { following: user.following },
            { new: true }
        )

        const updatedOther = await User.findByIdAndUpdate(
            otherID,
            { followers: otherUser.followers },
            { new: true }
        )

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};


import express from "express";
import { verifyToken } from "../middleware/token.js"
import { createComment, deleteComment, updateComment } from "../controller/comment.js";

const router = express.Router();

// CREATE
router.route("/:recipeID/comments").post(verifyToken, createComment);

// READ
// router.route("/:userID").get(getUser);
// router.route("/:userID/:connection").get(verifyToken, getUserFollow);

// UPDATE
router.route("/:recipeID/comments/:commentID").patch(verifyToken, updateComment);

// DELETE
router.route("/:recipeID/comments/:commentID").delete(verifyToken, deleteComment);

export default router;
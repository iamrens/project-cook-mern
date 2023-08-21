import express from "express";
import { verifyToken } from "../middleware/token.js"
import { getUser, toggleFollow, getUserFollow } from "../controller/user.js";

const router = express.Router();

// CREATE


// READ
router.route("/:userID").get(getUser);
router.route("/:userID/:connection").get(verifyToken, getUserFollow);

// UPDATE
router.route("/:userID/follow/:otherID").patch(verifyToken, toggleFollow);

// DELETE


export default router;
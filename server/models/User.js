import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: [2, "Username should contain at least 2~15 characters"],
        maxLength: [15, "Username should contain at least 2~15 characters"],
        unique: true,
        required: true,
    },
    password: {
        type: String,
        min: 8,
        max: 50,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    followers: {
        type: Map,
        of: Boolean,
        default: {}
    },
    following: {
        type: Map,
        of: Boolean,
        default: {}
    },
    savedRecipes: {
        type: Map,
        of: Boolean,
        default: {}
    },
}, { timestamps: true } );

const User = mongoose.model("User", UserSchema);
export default User;
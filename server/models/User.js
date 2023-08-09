import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min: 2,
        max: 50,
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 50,
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
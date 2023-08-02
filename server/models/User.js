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
}, { timestamps: true } );

const User = mongoose.model("User", UserSchema);
export default User;
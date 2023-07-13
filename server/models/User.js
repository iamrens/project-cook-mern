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
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    profilePath: {
        type: String,
    },
}, { timestamps: true } );

const User = mongoose.model("User", UserSchema);
export default User;
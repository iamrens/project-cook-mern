import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import validator from "validator";

export const register = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const emailExist = await User.findOne({ email });
    const userExist = await User.findOne({ username });

    // Validation checks
    if (userExist) {
      throw new Error("Email already exist.");
    }
    if (emailExist) {
      throw new Error("Username already exist.");
    }
    if (!email || !password || !username) {
      throw new Error("Please provide the required fields");
    }
    if (!validator.isEmail(email)) {
      throw new Error("Invalid email format.");
    }
    if (!validator.isStrongPassword(password)) {
      throw new Error(
        "Password must be strong. Use at least 8 characters, with uppercase letters, digits, and symbols."
      );
    }

    // Default picture if there will be no uploaded image
    const usernameInitial = username.charAt(0).toUpperCase();
    const defaultProfile = `https://ui-avatars.com/api/?name=${usernameInitial}&background=random&color=random&rounded=true&bold=true`;

    let profilePath = defaultProfile;
    if (req.file && req.file.path) {
      profilePath = req.file.path;
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      username,
      password: passwordHash,
      profilePath,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user exist
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("User does not exist");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Wrong password");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d'});
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from "helmet";
import morgan from "morgan";
import { v2 as cloudinary } from 'cloudinary';
import multer from "multer";
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import bodyParser from "body-parser";

import authRoutes from './routes/auth.js'
import recipeRoutes from './routes/recipe.js'
import userRoutes from './routes/user.js'
import commentRoutes from './routes/comment.js'
import { createRecipe, updateRecipe } from './controller/recipe.js'
import { verifyToken } from './middleware/token.js'

// CONFIGS
const app = express();
dotenv.config()
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up Cloudinary storage for profile pictures
const recipeStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'secret-spice',
    allowedFormats: ['jpg', 'png', 'jpeg'],
  },
  filename: (req, file, cb) => {
    cb(undefined, file.originalname);
}
});
const uploadRecipe = multer({ storage: recipeStorage, limits: { fileSize: 2097152 } }); // filesize limit of 2mb

// ROUTE WITH FILES
app.post("/recipes", verifyToken, uploadRecipe.single("image"), createRecipe);
app.patch("/recipes/:recipeID", verifyToken, uploadRecipe.single("image"), updateRecipe);

// GENERAL ROUTES
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/recipes", recipeRoutes);
app.use("/recipes", commentRoutes);


app.get("/", (req, res) => {
  res.send({ message: "Welcome to the server"});
})

// MONGOOSE SETUP
const PORT = process.env.PORT || 6000;

mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected')
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

  })
  .catch((error) => console.log(`${error} did not connect`));
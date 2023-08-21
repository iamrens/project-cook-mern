import mongoose from "mongoose";

const RatingSchema = mongoose.Schema({
    recipeID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
      required: true,
    },
    userOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  });
  
const Rating = mongoose.model("Rating", RatingSchema);
  
export default Rating;
  
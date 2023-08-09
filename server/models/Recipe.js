import mongoose from "mongoose";

const RecipeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ingredients: [
    {
      type: String,
      required: true,
    },
  ],
  instructions: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
    default: "",
  },
  cookingTime: {
    type: Number,
    required: true,
  },
  likes: {
    type: Map,
    of: Boolean,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, { timestamps: true } );

const Recipe = mongoose.model("Recipe", RecipeSchema);
export default Recipe;
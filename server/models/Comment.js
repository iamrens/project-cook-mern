import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
   content: {
    type: String,
    required: true
   },
   userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
   },
   recipePath: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
      required: true,
   }
}, { timestamps: true } );

const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;
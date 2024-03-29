import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  tags: String,
  selectedFile: String,
  fileName: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  }
})

const PostManagement = mongoose.model("PostManagement", postSchema);

export default PostManagement;
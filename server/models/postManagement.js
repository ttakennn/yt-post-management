import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  userId: String,
  title: String,
  message: String,
  creator: String,
  tags: String,
  selectedFile: String,
  fileName: String,
  likeCount: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostManagement = mongoose.model('PostManagement', postSchema);

export default PostManagement;

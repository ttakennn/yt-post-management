import PostManagement from "../models/postManagement.js";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostManagement(post);

  try {
    await newPost.save();
    await delay(1500);

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({message: error.message})
  }
}
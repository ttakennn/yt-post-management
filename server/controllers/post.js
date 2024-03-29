import PostManagement from "../models/postManagement.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
  try {
    const postManagement = await PostManagement.find();

    res.status(200).json(postManagement);
  } catch (error) {
    res.status(404).json({message: error.message});
  }
}

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostManagement(post);

  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({message: error.message})
  }
}

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const post = req.body;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No post with id!");
  }

  const updatePost = await PostManagement.findByIdAndUpdate(
    id, {...post, id }, {new: true}
  )

  res.json(updatePost);
}

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No post with id!");
  }

  await PostManagement.findByIdAndDelete(id);

  res.json({ message: "Post has deleted sucessfully!" });
}

export const likePost = async (req, res) => {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No post with id!");
  }

  const post = await PostManagement.findById(id);

  const updatePost = await PostManagement.findByIdAndUpdate(
    id, { likeCount: post.likeCount + 1},
    { new: true }
  )

  res.json(updatePost);
}
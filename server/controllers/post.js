import PostManagement from '../models/postManagement.js';
import mongoose from 'mongoose';

export const getPosts = async (req, res) => {
  try {
    const postManagement = await PostManagement.find();

    res.status(200).json(postManagement);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const postManagement = await PostManagement.find({ _id: id });

    res.status(200).json(postManagement);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const checkFieldEmpty = (field) => {
  return field === '' || field === null || field === undefined;
};

export const getPostsBySearch = async (req, res) => {
  const { page, title, tags } = req.query;

  try {
    const ITEMS_PER_PAGE = 3;
    const startIdx = (Number(page) - 1) * ITEMS_PER_PAGE;

    const decodeTitle = decodeURIComponent(title || '');
    const titleQuery = new RegExp(decodeTitle, 'i');

    const tagsArray = tags ? tags.split(',').map((tag) => tag.trim()) : [];
    const regexString = tagsArray.join('|');
    const tagsQuery = new RegExp(regexString, 'i');

    let query = {};

    if (!checkFieldEmpty(decodeTitle) && checkFieldEmpty(tags)) {
      query.title = titleQuery;
    } else if (checkFieldEmpty(decodeTitle) && !checkFieldEmpty(tags)) {
      query.tags = tagsQuery;
    } else {
      query = {
        $or: [{ title: titleQuery }, { tags: tagsQuery }],
      };
    }

    const total = await PostManagement.countDocuments(query);

    const posts = await PostManagement.find(query)
      .sort({ _id: -1 })
      .limit(ITEMS_PER_PAGE)
      .skip(startIdx);

    res.status(200).json({
      data: posts,
      currentPage: Number(page) || 1,
      totalPage: Math.ceil(total / ITEMS_PER_PAGE),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  try {
    const newPost = new PostManagement({
      ...post,
      userId: req.userId,
      createAt: new Date().toISOString(),
    });
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('No post with id!');
  }

  const updatePost = await PostManagement.findByIdAndUpdate(
    id,
    { ...post, id },
    { new: true },
  );

  res.json(updatePost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('No post with id!');
  }

  await PostManagement.findByIdAndDelete(id);

  res.json({ message: 'Post has deleted sucessfully!' });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('No post with id!');
  }

  const post = await PostManagement.findById(id);
  const index = post.likeCount.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    // like post
    post.likeCount.push(req.userId);
  } else {
    // dislike post
    post.likeCount = post.likeCount.filter((id) => id !== String(req.userId));
  }

  const updatePost = await PostManagement.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatePost);
};

export const commentPost = async (req, res) => {
  const { id } = req.params;
  const { name, comment } = req.body;

  const post = await PostManagement.findById(id);

  if (!post) {
    return res.status(404).send('No post with id!');
  }

  post.comments.push({
    name: name,
    message: comment,
    createdAt: new Date().toISOString(),
  });

  const updatePost = await PostManagement.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatePost);
};

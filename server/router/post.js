import express from 'express';
import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  likePost,
  getPostsBySearch,
  getPostById,
  commentPost,
} from '../controllers/post.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getPosts);
router.get('/search', auth, getPostsBySearch);
router.get('/:id', auth, getPostById);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
router.post('/:id/commentPost', auth, commentPost);

export default router;

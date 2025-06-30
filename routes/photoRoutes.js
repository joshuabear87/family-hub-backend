import express from 'express';
import {
  getPhotos,
  uploadPhoto,
  deletePhoto,
} from '../controllers/photoController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

console.log('🔗 Photo routes loaded');

router.route('/')
  .get(getPhotos)
  .post(protect, upload.single('image'), uploadPhoto);

router.route('/:id')
  .delete(protect, deletePhoto);

export default router;

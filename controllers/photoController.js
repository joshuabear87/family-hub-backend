import Photo from '../models/Photo.js';
import cloudinary from '../config/cloudinary.js';
import asyncHandler from 'express-async-handler';

// GET all photos
export const getPhotos = asyncHandler(async (req, res) => {
  console.log('🖼️ Fetching all photos');
  const photos = await Photo.find({});
  res.json(photos);
});

// UPLOAD photo
export const uploadPhoto = asyncHandler(async (req, res) => {
  if (!req.file) {
    console.error('❌ No file uploaded');
    res.status(400);
    throw new Error('No file uploaded');
  }

  console.log('📸 Uploading photo file:', req.file);

  const photo = new Photo({
    user: req.user._id,
    url: req.file.path, // Cloudinary URL
    public_id: req.file.filename || req.file.public_id || '', // fallback logic
    caption: req.body.caption,
  });

  await photo.save();
  console.log('✅ Photo saved to DB:', photo);
  res.status(201).json(photo);
});

// DELETE photo
export const deletePhoto = asyncHandler(async (req, res) => {
  const photo = await Photo.findById(req.params.id);

  if (!photo) {
    res.status(404);
    throw new Error('Photo not found');
  }

  if (photo.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to delete this photo');
  }

  console.log('🗑️ Deleting photo from Cloudinary:', photo.public_id);
  await cloudinary.uploader.destroy(photo.public_id);

  await photo.deleteOne();
  console.log('✅ Photo deleted from DB:', photo._id);
  res.json({ message: 'Photo deleted' });
});

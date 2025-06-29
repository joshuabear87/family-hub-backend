import Photo from '../models/Photo.js';
import cloudinary from '../config/cloudinary.js';

export const getPhotos = async (req, res) => {
  const photos = await Photo.find({ user: req.user._id });
  res.json(photos);
};

export const uploadPhoto = async (req, res) => {
  if (!req.file) {
    res.status(400).json({ message: 'No file uploaded' });
    return;
  }

  const photo = new Photo({
    user: req.user._id,
    url: req.file.path, // Cloudinary URL
    public_id: req.file.filename || req.file.public_id || '', // updated fallback
    caption: req.body.caption,
  });

  await photo.save();
  res.status(201).json(photo);
};

export const deletePhoto = async (req, res) => {
  const photo = await Photo.findById(req.params.id);

  if (!photo) {
    res.status(404).json({ message: 'Photo not found' });
    return;
  }

  if (photo.user.toString() !== req.user._id.toString()) {
    res.status(401).json({ message: 'Not authorized' });
    return;
  }

  // Delete from Cloudinary
  await cloudinary.uploader.destroy(photo.public_id);

  // Delete from database
  await photo.deleteOne();

  res.json({ message: 'Photo deleted' });
};

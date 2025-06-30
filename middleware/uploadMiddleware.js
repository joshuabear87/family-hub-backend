import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

console.log('📦 Configuring multer Cloudinary storage');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'family-hub-gallery',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    public_id: (req, file) => Date.now() + '-' + file.originalname.split('.')[0],
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB file size limit
});

console.log('✅ Multer configured with Cloudinary storage and 5MB limit');

export default upload;

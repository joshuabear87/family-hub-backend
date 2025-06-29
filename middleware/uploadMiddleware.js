import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
  folder: 'family-hub-gallery',
  allowed_formats: ['jpg', 'jpeg', 'png'],
  public_id: (req, file) => Date.now() + '-' + file.originalname.split('.')[0],
},
});

const upload = multer({ storage });

export default upload;

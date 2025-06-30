import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;
  console.log('🔐 Protect middleware triggered');

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      console.log('🔑 Token found:', token.slice(0, 10), '...');

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');

      console.log('✅ User authenticated via token:', req.user._id);
      next();
    } catch (error) {
      console.error('❌ Token verification failed:', error.message);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    console.warn('❌ No token provided');
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

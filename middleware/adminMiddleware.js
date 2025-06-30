export const admin = (req, res, next) => {
  console.log('🔒 Admin middleware triggered');
  if (req.user && req.user.role === 'admin') {
    console.log('✅ Admin authorized:', req.user._id);
    next();
  } else {
    console.warn('❌ Not authorized as admin:', req.user ? req.user._id : 'No user');
    res.status(401).json({ message: 'Not authorized as admin' });
  }
};

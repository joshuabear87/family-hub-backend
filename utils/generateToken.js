import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  console.log('🔑 Generating token for user ID:', id);
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

export default generateToken;

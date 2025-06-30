import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import asyncHandler from 'express-async-handler';

// REGISTER user
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  console.log('👤 Registering user:', email);

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    approved: false, // pending approval
  });

  console.log('✅ User registered (pending approval):', user._id);
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    approved: user.approved,
  });
});

// LOGIN user
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log('🔑 Authenticating user:', email);

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    if (!user.approved) {
      res.status(401);
      throw new Error('Your account is pending admin approval.');
    }

    console.log('✅ User authenticated:', user._id);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// APPROVE user (admin only)
export const approveUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.approved = true;
  await user.save();
  console.log('✅ User approved:', user._id);
  res.json({ message: `${user.name} has been approved.` });
});

// GET all users (admin)
export const getUsers = asyncHandler(async (req, res) => {
  console.log('👥 Fetching all users');
  const users = await User.find({});
  res.json(users);
});

// DELETE user (admin)
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  await user.deleteOne();
  console.log('🗑️ User deleted:', req.params.id);
  res.json({ message: 'User deleted' });
});

// UPDATE user role (admin)
export const updateUserRole = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.role = req.body.role || 'user';
  await user.save();
  console.log('🔧 User role updated:', user._id, 'New role:', user.role);
  res.json({ message: `User role updated to ${user.role}` });
});

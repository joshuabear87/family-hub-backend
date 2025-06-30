import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// Register user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const user = await User.create({
      name,
      email,
      password,
      approved: false, // new users are pending approval
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      approved: user.approved,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Login user
export const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    if (!user.approved) {
      res.status(401).json({ message: 'Your account is pending admin approval.' });
      return;
    }

    res.json({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  token: generateToken(user._id),
});
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

// Approve user (admin only)
export const approveUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  user.approved = true;
  await user.save();

  res.json({ message: `${user.name} has been approved.` });
};

export const getUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};

// Delete user
export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }
  await user.remove();
  res.json({ message: 'User deleted' });
};

// Promote/Demote user
export const updateUserRole = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }
  user.role = req.body.role || 'user';
  await user.save();
  res.json({ message: `User role updated to ${user.role}` });
};

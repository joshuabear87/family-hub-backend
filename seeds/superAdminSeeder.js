import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';


dotenv.config();

const seedSuperAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');

    const email = 'joshuabear87@gmail.com';
    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      console.log('Superadmin already exists');
    } else {
      const superadmin = new User({
        name: 'Super Admin',
        email,
        password: 'Atendidobear7330', 
        role: 'admin',
        approved: true,
      });

      await superadmin.save();
      console.log('Superadmin created successfully');
    }

    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

seedSuperAdmin();
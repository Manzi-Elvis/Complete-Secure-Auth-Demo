const User = require('../models/user');
const bcrypt = require('bcryptjs')

//Creating a new user:
exports.createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 1️⃣ Check all fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields (name, email, password) are required' });
        }
        
        // 2️⃣ Check if email already exists in User collection
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // 3️⃣ Hash password safely
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4️⃣ Create the new user
        const user = await User.create({ name, email, password: hashedPassword });

        // 5️⃣ Success
        res.status(201).json({ message: 'User created successfully', user });

    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ message: 'Unexpected server error', error: error.message });
    }
};

// Get all users:
exports.getAllUsers = async(req, res) => {
      try{
            const users = await User.find();
            res.json(users);
      }
      catch(error){
            res.status(500).json({message: error.message});
      }
};

// Get user by ID:
exports.getUserById = async (req, res) => {
      try{
            const user = await User.findById(req.params.id);
            if(!user) return res.status(404).json({message: 'User not found'})
            res.json(user);
      }
      catch (error) {
            res.status(500).json({ message: error.message });
      }
}

// Update user
exports.updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = name;
    user.email = email;

    if (password && password.trim() !== '') {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
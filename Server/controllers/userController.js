const User = require('../models/user');
const bcrypt = require('bcryptjs')

//Creating a new user:
exports.createUser = async (req, res) => {
      try{
            const { name, email, password } = req.body
            if (!name || !email || !password ){
                  return res.status(400).json({message: 'All fields are required'})
            }
            const existing = await UserActivation.findOne({email});
            if(existing){
                  return res.status(400).json({message: "Email already exists"});
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({name, email, password: hashedPassword});
            res.status(201).json(user)
      }
      catch(error){
            res.status(500).json({message: error.message})
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
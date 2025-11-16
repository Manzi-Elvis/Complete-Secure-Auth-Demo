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

// Get all users
exports.getAllUsers = async(req, res) => {
      try{
            const users = await User.find();
            res.json(users);
      }
      catch(error){
            res.status(500).json({message: error.message});
      }
};
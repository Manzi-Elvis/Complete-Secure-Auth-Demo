const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
      name: {
            type: String,
            required: true
      },
      email: {
            type: String,
            required: true,
            unique: true,
            match: [/\S+@\S+\.\S+/, 'Please use a valid email address']
      },

      password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [8, 'Password must be at least 8 characters long'],
            validate: {
                  validator: function(value) {
                        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/.test(value);
                  },
                  message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
            }
      },

},{ timestamps: true });

module.exports = mongoose.model('User', userSchema);
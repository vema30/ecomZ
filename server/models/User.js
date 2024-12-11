const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the User schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true, // Removes any leading/trailing whitespace
  },
  firstName: {
    type: String,
    required: true,
    trim: true, // Removes any leading/trailing whitespace
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  
  role: {
    type: String,
    enum: ['user', 'admin', 'User','Admin'], // Restricts to specific roles
    required: true,
  },
 phonenumber: {
      type: String,
     // required: true,
     // unique: true, // Ensure phone number is unique
    },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields automatically
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;

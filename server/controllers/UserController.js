const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

require('dotenv').config();


const Register = async (req, res) => {
  try {
    const { phonenumber, role, lastName, firstName, password, email } = req.body;
    console.log(phonenumber, role, lastName, firstName, password, email);

    // Validate required fields
    if (!phonenumber || !role || !lastName || !firstName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Registration failed: Missing required fields.",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ phonenumber }, { email }] });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this phone number or email already exists.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const user = await User.create({
      phonenumber,
      role,
      lastName,
      firstName,
      password: hashedPassword,
      email,
    });

    console.log("User registered successfully.");
    return res.status(201).json({
      success: true,
      message: "Registered successfully.",
      user: {
        id: user._id,
        email: user.email,
        phonenumber: user.phonenumber,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    console.error("Error in register controller:", error);

    return res.status(500).json({
      success: false,
      message: "An error occurred while registering the user.",
    });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Login failed: Missing required fields.",
      });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email not registered.",
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Password incorrect.",
      });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET, // Store your secret in environment variables
      { expiresIn: '1h' } // Token validity
    );

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token, // Include the token in the response
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    console.error("Error in login controller:", error);

    return res.status(500).json({
      success: false,
      message: "An error occurred during login.",
    });
  }
};

module.exports = {
  Register,
  Login,
};

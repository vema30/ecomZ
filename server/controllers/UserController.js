const User = require('../models/User');

const Register = async (req, res) => {
  try {
    const { phonenumber, role, lastName, firstName ,password,email} = req.body;
     console.log(phonenumber,role,lastName,firstName,password,email);
    // Validate required fields
    if (!phonenumber || !role || !lastName || !firstName ||!email || !password) {
      return res.status(400).json({
        message: "Registration failed: Missing required fields.",
        success: false,
      });
    }

    // Check if user already exists (optional, based on your requirements)
    
    const existingUser = await User.findOne({ phonenumber: phonenumber});
    if (existingUser) {
      return res.status(400).json({ message: 'Phone number already exists.' });
    }
    
    // Create the new user
    const user = await User.create({
      phonenumber,
      role,
      lastName,
      firstName,
      password,
      email
    });
            console.log("done bro ");
    return res.status(200).json({
      message: "Registered successfully.",
      success: true,
      user, // Optional: return the created user object
    });
  } catch (error) {
    console.error("Error in register controller:", error);

    return res.status(500).json({
      message: "An error occurred while registering the user.",
      success: false,
    });
  }
};

module.exports = {
  Register,
};

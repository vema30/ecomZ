const cloudinary = require('cloudinary').v2;
require('dotenv').config();  // Load environment variables from .env

// Configure Cloudinary with your credentials
const configureCloudinary = () => {
  try{
    cloudinary.config({
      cloudinary_url: process.env.CLOUDINARY_URL,  
      });
      console.log("cloudinart connected succssfully");
  }
  catch(e)
  {
    console.log("error in cloudinart connection");
  }
};

configureCloudinary();  // Call the function to initialize Cloudinary

module.exports = cloudinary;  // Export cloudinary instance to use elsewhere

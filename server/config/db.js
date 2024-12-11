const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const dbURI = process.env.MONGO_URI || 'mongodb://localhost:27017/ec'; // Replace with your database URI
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,

    };

    const conn = await mongoose.connect(dbURI, options);
    console.log(`MongoDB Connected: ${conn.connection.host}`); // Log the connection
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;

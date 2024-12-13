const express = require('express');
require('dotenv').config();
const {configureCloudinary} =require('./config/cloudinaryConfig'); 
const cors = require('cors'); // Import cors package
const Product = require('./models/Product');

const userRoutes = require('./routes/userRoute'); // Update the path based on your folder structure
const app = express();
const connectDB = require('./config/db');
require('dotenv').config();

// Enable CORS for all routes
app.use(cors()); // This will allow all domains. You can configure it further if needed

app.use(express.json()); // Middleware to parse JSON request bodies

connectDB();
//configureCloudinary();
console.log(process.env.JWT_SECRET);
// Use the user routes
app.use('/api/users', userRoutes);
app.get('/getproducts', async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products from the database
    res.status(200).json(products); // Send the list of products as the response
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

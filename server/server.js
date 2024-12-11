const express = require('express');
require('dotenv').config();

const cors = require('cors'); // Import cors package

const userRoutes = require('./routes/userRoute'); // Update the path based on your folder structure
const app = express();
const connectDB = require('./config/db');
require('dotenv').config();

// Enable CORS for all routes
app.use(cors()); // This will allow all domains. You can configure it further if needed

app.use(express.json()); // Middleware to parse JSON request bodies

connectDB();
console.log(process.env.JWT_SECRET);
// Use the user routes
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

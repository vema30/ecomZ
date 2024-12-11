const express = require('express');
const router = express.Router();
const {Register,Login,getProfile}=require('../controllers/UserController');
const authenticateToken= require('../middlewares/auth');
router.post('/register',Register);
router.post('/login',Login);
router.get('/profile',authenticateToken,getProfile);
module.exports=router;
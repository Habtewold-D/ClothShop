const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Register admin (for initial setup only)
router.post('/register', adminController.registerAdmin);

// Login admin
router.post('/login', adminController.loginAdmin);

module.exports = router; 
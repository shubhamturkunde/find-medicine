const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Pharmacist = require('../models/Pharmacist');
const { protect } = require('../middleware/authMiddleware');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'super_secret_medicine_key_12345', {
    expiresIn: '30d'
  });
};

// @route   POST /api/auth/register
// @desc    Register a new Pharmacist
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, pharmacyName, licenseNumber, contactNumber } = req.body;

    if (!name || !email || !password || !pharmacyName || !licenseNumber) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const pharmacistExists = await Pharmacist.findOne({ email });

    if (pharmacistExists) {
      return res.status(400).json({ message: 'Pharmacist already exists with this email' });
    }

    const pharmacist = await Pharmacist.create({
      name,
      email,
      password,
      pharmacyName,
      licenseNumber,
      contactNumber
    });

    if (pharmacist) {
      res.status(201).json({
        _id: pharmacist._id,
        name: pharmacist.name,
        email: pharmacist.email,
        pharmacyName: pharmacist.pharmacyName,
        licenseNumber: pharmacist.licenseNumber,
        token: generateToken(pharmacist._id)
      });
    } else {
      res.status(400).json({ message: 'Invalid pharmacist data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate pharmacist & get token
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const pharmacist = await Pharmacist.findOne({ email });

    if (pharmacist && (await pharmacist.matchPassword(password))) {
      res.json({
        _id: pharmacist._id,
        name: pharmacist.name,
        email: pharmacist.email,
        pharmacyName: pharmacist.pharmacyName,
        licenseNumber: pharmacist.licenseNumber,
        token: generateToken(pharmacist._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/auth/me
// @desc    Get current pharmacist profile
// @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    res.json(req.pharmacist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

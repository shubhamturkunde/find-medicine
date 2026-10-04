const jwt = require('jsonwebtoken');
const Pharmacist = require('../models/Pharmacist');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super_secret_medicine_key_12345');
      req.pharmacist = await Pharmacist.findById(decoded.id).select('-password');

      if (!req.pharmacist) {
        return res.status(401).json({ message: 'Pharmacist not found or unauthorized' });
      }

      next();
    } catch (error) {
      console.error('Auth middleware error:', error);
      res.status(401).json({ message: 'Not authorized, token invalid' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

module.exports = { protect };

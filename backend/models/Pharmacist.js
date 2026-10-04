const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const pharmacistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6
  },
  pharmacyName: {
    type: String,
    required: [true, 'Please add pharmacy or hospital name'],
    trim: true
  },
  licenseNumber: {
    type: String,
    required: [true, 'Please add pharmacy license number'],
    trim: true
  },
  contactNumber: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Encrypt password before saving
pharmacistSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Match password
pharmacistSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Pharmacist', pharmacistSchema);

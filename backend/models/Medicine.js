const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add medicine name'],
    trim: true,
    index: true
  },
  genericName: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Please select or enter category'],
    trim: true
  },
  dosage: {
    type: String,
    required: [true, 'Please enter dosage (e.g. 500mg, 1 tablet, 5ml)'],
    trim: true
  },
  timings: {
    morning: { type: Boolean, default: false },
    afternoon: { type: Boolean, default: false },
    evening: { type: Boolean, default: false },
    night: { type: Boolean, default: false }
  },
  mealTiming: {
    type: String,
    enum: ['Before Meal', 'After Meal', 'With Food', 'Empty Stomach', 'As Needed'],
    default: 'After Meal'
  },
  specificInstructions: {
    type: String,
    required: [true, 'Please provide intake instructions (e.g. 30 mins before lunch with water)'],
    trim: true
  },
  purpose: {
    type: String,
    trim: true,
    placeholder: 'What is this medicine used for? (e.g. Fever, Pain relief, Diabetes)'
  },
  sideEffects: {
    type: String,
    trim: true
  },
  storageInfo: {
    type: String,
    trim: true
  },
  pharmacist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pharmacist',
    required: true
  },
  pharmacyName: {
    type: String
  }
}, {
  timestamps: true
});

// Text index on name, genericName, category, purpose for multi-field search
medicineSchema.index({ name: 'text', genericName: 'text', category: 'text', purpose: 'text' });

module.exports = mongoose.model('Medicine', medicineSchema);

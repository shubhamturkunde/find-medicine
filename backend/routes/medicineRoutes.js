const express = require('express');
const router = express.Router();
const Medicine = require('../models/Medicine');
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/medicines
// @desc    Get all medicines or search by query (Public for patients)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { query, mealTiming, morning, afternoon, evening, night } = req.query;

    let filter = {};

    if (query && query.trim() !== '') {
      const searchRegex = new RegExp(query.trim(), 'i');
      filter.$or = [
        { name: searchRegex },
        { genericName: searchRegex },
        { category: searchRegex },
        { purpose: searchRegex }
      ];
    }

    if (mealTiming) {
      filter.mealTiming = mealTiming;
    }

    if (morning === 'true') filter['timings.morning'] = true;
    if (afternoon === 'true') filter['timings.afternoon'] = true;
    if (evening === 'true') filter['timings.evening'] = true;
    if (night === 'true') filter['timings.night'] = true;

    const medicines = await Medicine.find(filter).sort({ createdAt: -1 });
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/medicines/my-medicines
// @desc    Get medicines added by logged-in pharmacist
// @access  Private
router.get('/my-medicines', protect, async (req, res) => {
  try {
    const medicines = await Medicine.find({ pharmacist: req.pharmacist._id }).sort({ createdAt: -1 });
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/medicines/:id
// @desc    Get single medicine details
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id).populate('pharmacist', 'name pharmacyName contactNumber email');
    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }
    res.json(medicine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/medicines
// @desc    Add a new medicine (Pharmacist only)
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const {
      name,
      genericName,
      category,
      dosage,
      timings,
      mealTiming,
      specificInstructions,
      purpose,
      sideEffects,
      storageInfo
    } = req.body;

    if (!name || !category || !dosage || !specificInstructions) {
      return res.status(400).json({ message: 'Please enter all required fields: Name, Category, Dosage, and Instructions' });
    }

    const medicine = new Medicine({
      name,
      genericName,
      category,
      dosage,
      timings: timings || { morning: false, afternoon: false, evening: false, night: false },
      mealTiming: mealTiming || 'After Meal',
      specificInstructions,
      purpose,
      sideEffects,
      storageInfo,
      pharmacist: req.pharmacist._id,
      pharmacyName: req.pharmacist.pharmacyName
    });

    const createdMedicine = await medicine.save();
    res.status(201).json(createdMedicine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/medicines/:id
// @desc    Update medicine (Pharmacist only)
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);

    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    // Check if pharmacist owns this medicine record
    if (medicine.pharmacist.toString() !== req.pharmacist._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to edit this medicine' });
    }

    const {
      name,
      genericName,
      category,
      dosage,
      timings,
      mealTiming,
      specificInstructions,
      purpose,
      sideEffects,
      storageInfo
    } = req.body;

    medicine.name = name !== undefined ? name : medicine.name;
    medicine.genericName = genericName !== undefined ? genericName : medicine.genericName;
    medicine.category = category !== undefined ? category : medicine.category;
    medicine.dosage = dosage !== undefined ? dosage : medicine.dosage;
    medicine.timings = timings !== undefined ? timings : medicine.timings;
    medicine.mealTiming = mealTiming !== undefined ? mealTiming : medicine.mealTiming;
    medicine.specificInstructions = specificInstructions !== undefined ? specificInstructions : medicine.specificInstructions;
    medicine.purpose = purpose !== undefined ? purpose : medicine.purpose;
    medicine.sideEffects = sideEffects !== undefined ? sideEffects : medicine.sideEffects;
    medicine.storageInfo = storageInfo !== undefined ? storageInfo : medicine.storageInfo;

    const updatedMedicine = await medicine.save();
    res.json(updatedMedicine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/medicines/:id
// @desc    Delete medicine (Pharmacist only)
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);

    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    if (medicine.pharmacist.toString() !== req.pharmacist._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this medicine' });
    }

    await medicine.deleteOne();
    res.json({ message: 'Medicine removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

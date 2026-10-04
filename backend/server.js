const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const medicineRoutes = require('./routes/medicineRoutes');
const authRoutes = require('./routes/authRoutes');
const Medicine = require('./models/Medicine');
const Pharmacist = require('./models/Pharmacist');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Database connection middleware with enhanced diagnostics
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({
      message: 'Database connection failed',
      error: err.message,
      hasMongodbUri: !!process.env.MONGODB_URI,
      hint: !process.env.MONGODB_URI 
        ? 'MONGODB_URI is missing in Vercel Environment Variables.' 
        : 'Please verify IP 0.0.0.0/0 is whitelisted in MongoDB Atlas Network Access.'
    });
  }
});

// Seed endpoint handler
const handleSeedRequest = async (req, res) => {
  try {
    await connectDB();
    const count = await Medicine.countDocuments();
    if (count === 0) {
      const demoPharmacist = await Pharmacist.create({
        name: 'Dr. Ramesh Sharma',
        email: 'pharmacist@example.com',
        password: 'password123',
        pharmacyName: 'Apollo Care Pharmacy',
        licenseNumber: 'DL-IND-884920',
        contactNumber: '+91 9876543210'
      });

      await Medicine.insertMany([
        {
          name: 'Paracetamol (Calpol 650)',
          genericName: 'Paracetamol / Acetaminophen',
          category: 'Analgesic & Antipyretic',
          dosage: '1 Tablet (650mg)',
          timings: { morning: true, afternoon: true, evening: false, night: true },
          mealTiming: 'After Meal',
          specificInstructions: 'Take 1 tablet after breakfast and after dinner with half a glass of plain water. Do not exceed 4 tablets in 24 hours.',
          purpose: 'Fever reduction, headache, body pain, and joint aches.',
          sideEffects: 'Mild nausea or dizziness if taken on empty stomach.',
          storageInfo: 'Store below 25°C away from direct sunlight.',
          pharmacist: demoPharmacist._id,
          pharmacyName: demoPharmacist.pharmacyName
        },
        {
          name: 'Pantoprazole 40mg (Pan-40)',
          genericName: 'Pantoprazole Sodium',
          category: 'Antacid / Proton Pump Inhibitor',
          dosage: '1 Capsule (40mg)',
          timings: { morning: true, afternoon: false, evening: false, night: false },
          mealTiming: 'Empty Stomach',
          specificInstructions: 'Take 1 capsule early in the morning 30 minutes BEFORE lunch/breakfast with a glass of water.',
          purpose: 'Acidity, GERD, heartburn, and stomach ulcers.',
          sideEffects: 'Mild headache or dry mouth.',
          storageInfo: 'Keep in cool dry place.',
          pharmacist: demoPharmacist._id,
          pharmacyName: demoPharmacist.pharmacyName
        }
      ]);
      return res.json({ message: 'Seed operation completed successfully' });
    }
    res.json({ message: 'Database already has records', count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

app.get('/api/seed', handleSeedRequest);
app.get('/seed', handleSeedRequest);

// Mount routes on all path variations for 100% Vercel route matching
app.use('/api/medicines', medicineRoutes);
app.use('/medicines', medicineRoutes);

app.use('/api/auth', authRoutes);
app.use('/auth', authRoutes);

// Fallback mounts for Vercel path rewrites
app.use('/api', medicineRoutes);
app.use('/api', authRoutes);

// Health Check Endpoints
app.get('/api', (req, res) => res.json({ message: 'Find Medicine API is active' }));
app.get('/', (req, res) => res.send('Find Medicine API Server is running'));

// Port listener for local execution
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;

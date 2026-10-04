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

// Connect to MongoDB
connectDB().then(async () => {
  // Auto-seed if database is completely empty
  try {
    const count = await Medicine.countDocuments();
    if (count === 0) {
      console.log('No medicines found in DB. Auto-seeding initial data...');
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
        },
        {
          name: 'Metformin 500mg (Glycomet)',
          genericName: 'Metformin Hydrochloride',
          category: 'Anti-Diabetic',
          dosage: '1 Tablet (500mg)',
          timings: { morning: true, afternoon: false, evening: false, night: true },
          mealTiming: 'With Food',
          specificInstructions: 'Take 1 tablet right AFTER breakfast and 1 tablet right AFTER dinner to avoid stomach upset.',
          purpose: 'Blood sugar control for Type 2 Diabetes.',
          sideEffects: 'Mild stomach discomfort in initial days.',
          storageInfo: 'Store at room temperature.',
          pharmacist: demoPharmacist._id,
          pharmacyName: demoPharmacist.pharmacyName
        },
        {
          name: 'Amoxicillin 500mg (Mox 500)',
          genericName: 'Amoxicillin Trihydrate',
          category: 'Antibiotic',
          dosage: '1 Capsule (500mg)',
          timings: { morning: true, afternoon: true, evening: false, night: true },
          mealTiming: 'After Meal',
          specificInstructions: 'Take every 8 hours after food for 5 full days without skipping doses.',
          purpose: 'Bacterial throat infections, ear infections, and chest infections.',
          sideEffects: 'Mild diarrhea or skin rash.',
          storageInfo: 'Store in airtight container.',
          pharmacist: demoPharmacist._id,
          pharmacyName: demoPharmacist.pharmacyName
        },
        {
          name: 'Cetirizine 10mg (Cetzine)',
          genericName: 'Cetirizine Hydrochloride',
          category: 'Antihistamine / Anti-Allergy',
          dosage: '1 Tablet (10mg)',
          timings: { morning: false, afternoon: false, evening: false, night: true },
          mealTiming: 'After Meal',
          specificInstructions: 'Take 1 tablet at night before sleeping after dinner. May cause drowsiness.',
          purpose: 'Running nose, sneezing, skin allergy, and cold symptoms.',
          sideEffects: 'Drowsiness, dry mouth.',
          storageInfo: 'Keep away from moisture.',
          pharmacist: demoPharmacist._id,
          pharmacyName: demoPharmacist.pharmacyName
        }
      ]);
      console.log('Auto-seeding complete!');
    }
  } catch (err) {
    console.error('Auto-seed check failed:', err);
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/medicines', medicineRoutes);
app.use('/api/auth', authRoutes);

// Root Health Endpoint
app.get('/', (req, res) => {
  res.send('Find Medicine API Server is running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

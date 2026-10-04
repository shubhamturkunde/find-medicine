const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Pharmacist = require('./models/Pharmacist');
const Medicine = require('./models/Medicine');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/find_medicine_db');
    console.log('MongoDB Connected for Seeding...');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing
    await Pharmacist.deleteMany({});
    await Medicine.deleteMany({});

    console.log('Cleared existing data.');

    // Create demo Pharmacist
    const demoPharmacist = await Pharmacist.create({
      name: 'Dr. Ramesh Sharma',
      email: 'pharmacist@example.com',
      password: 'password123',
      pharmacyName: 'Apollo Care Pharmacy',
      licenseNumber: 'DL-IND-884920',
      contactNumber: '+91 9876543210'
    });

    console.log('Demo Pharmacist created: pharmacist@example.com / password123');

    // Create sample medicines with detailed timing instructions
    const sampleMedicines = [
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
      },
      {
        name: 'Multivitamin & Mineral Tablet (Becosules)',
        genericName: 'Vitamin B-Complex + C',
        category: 'Nutritional Supplement',
        dosage: '1 Capsule',
        timings: { morning: false, afternoon: true, evening: false, night: false },
        mealTiming: 'After Meal',
        specificInstructions: 'Take 1 capsule daily after lunch with a full glass of water.',
        purpose: 'Mouth ulcers, energy boost, and vitamin deficiency recovery.',
        sideEffects: 'Bright yellow urine (harmless B-vitamin excretion).',
        storageInfo: 'Store in cool place.',
        pharmacist: demoPharmacist._id,
        pharmacyName: demoPharmacist.pharmacyName
      }
    ];

    await Medicine.insertMany(sampleMedicines);
    console.log(`Successfully seeded ${sampleMedicines.length} sample medicines!`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();

const mongoose = require('mongoose');

let cachedConnection = null;

const connectDB = async () => {
  // Reuse existing connection if ready
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }

  try {
    const rawUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/find_medicine_db';
    
    // Automatically sanitize and strip accidental whitespace, newlines, and carriage returns from Vercel inputs
    const uri = rawUri.trim().replace(/[\r\n\t]/g, '');

    // Connect with fast-fail timeouts
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    cachedConnection = conn;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    cachedConnection = null;
    throw error;
  }
};

module.exports = connectDB;

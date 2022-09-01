const mongoose = require('mongoose');

// ? Before connecting to the database, we need to check if the cluster IP in MongoDB Atlas is 0.0.0.0/0
const dbConnection = async() => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error);
    throw new Error('Error connecting to database');
  }
};

module.exports = {
  dbConnection,
};
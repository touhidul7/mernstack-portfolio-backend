const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error.message);
    process.exit(1); // Exit process with failure
  }
};
/* MONGO_URI= mongodb+srv://touhidulislamshadhin77:1ouinN4R-77@portfolio.fp7lt.mongodb.net/?retryWrites=true&w=majority&appName=portfolio */
module.exports = connectDB;

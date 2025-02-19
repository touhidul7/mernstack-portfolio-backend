const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
// const Info = require('./models/Info'); 
// const Project = require('./models/Project'); 
require('dotenv').config();

// Secure CORS configuration
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:5173', // Restrict to your frontend domain
  optionsSuccessStatus: 200
};

const app = express();
app.use(cors(corsOptions)); // Apply CORS configuration 
app.use(express.json());

connectDB();

// ====================== Info Routes ====================== //
app.use(require('./routes/inforoutes'));

// ====================== Info Routes END ====================== //


// ====================== Project Routes ====================== //

app.use(require('./routes/projectroutes'));


// ====================== Project Routes END ====================== //

app.get('/', (req, res) => {
  res.send('Registered Domain...');
});







// =================== Server Setup =================== //
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const serverless = require('serverless-http');
module.exports.handler = serverless(app);

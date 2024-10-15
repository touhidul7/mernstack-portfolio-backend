const express = require('express'); 
const cors = require('cors'); 
const connectDB = require('./config/db'); 
const mongoose = require('mongoose'); 
require('dotenv').config(); 

// Secure CORS configuration - replace 'your-frontend-domain.com' with your actual domain
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:3000', // Restrict to your frontend domaindd
  optionsSuccessStatus: 200
};

const infoSchema = new mongoose.Schema({
  name: String,
  email: String,
  JobTitle: String,
  Description: String,
  phone: String,
  Skills: [String],
  projects: [
    {
      shortname: String,
      projectName: String,
      technologies: [String],
      description: String,
      imageLink: String,
      projectURL: String,
    }
  ],
  experience: [
    {
      range: String,
      location: String,
      jobTitle: String,
      companyName: String,
      description: String,
    }
  ],
  Links: {
    Fiverr: String,
    Facebook: String,
    Twitter: String,
    Instagram: String,
    Medium: String,
    Quora: String,
    Pinterest: String,
    Github: String,
    Linkedin: String,
  }
});

// Indexes for better performance (optional, based on your use case)
infoSchema.index({ name: 1 });

const Info = mongoose.model('Info', infoSchema); 

const app = express(); 
app.use(cors(corsOptions)); // Apply CORS configuration 
app.use(express.json()); 

connectDB(); 

// ====================== Info Routes ====================== //

// GET: Fetch all info
app.get('/info', async (req, res) => {
  try {
    const info = await Info.find();
    res.json(info);
  } catch (error) {
    res.status(500).json({ message: "Error fetching info." });
  }
});

// POST: Add new info
app.post('/info', async (req, res) => {
  try {
    const newInfo = new Info(req.body);
    await newInfo.save();
    res.status(201).json({ message: "Info added successfully!", newInfo });
  } catch (error) {
    res.status(500).json({ message: "Error adding info." });
  }
});

// PUT: Update info by ID
app.put('/info/:id', async (req, res) => {
  try {
    const updatedInfo = await Info.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedInfo) {
      res.status(200).json({ message: "Info updated successfully!", updatedInfo });
    } else {
      res.status(404).json({ message: "Info not found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating info." });
  }
});

// DELETE: Remove info by ID
app.delete('/info/:id', async (req, res) => {
  try {
    const deletedInfo = await Info.findByIdAndDelete(req.params.id);
    if (deletedInfo) {
      res.status(200).json({ message: "Info deleted successfully!" });
    } else {
      res.status(404).json({ message: "Info not found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting info." });
  }
});
// ====================== Info Routes END ====================== //


// =================== Server Setup =================== //
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

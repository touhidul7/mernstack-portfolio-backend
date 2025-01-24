const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const Info = require('./models/Info'); // Import the Info model
const Project = require('./models/Project'); // Import the Info model
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

// GET: Fetch all info
app.get('/info', async (req, res) => {
  try {
    const info = await Info.find();
    res.json(info);
  } catch (error) {
    res.status(500).json({ message: "Error fetching info." });
  }
});

app.get('/project', async (req, res) => {
  try {
    const project = await Project.find();
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Error fetching project." });
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
app.post('/project', async (req, res) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();
    res.status(201).json({ message: "Project added successfully!", newProject });
  } catch (error) {
    res.status(500).json({ message: "Error adding Project." });
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
app.put('/project/:id', async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedProject) {
      res.status(200).json({ message: "Project updated successfully!", updatedProject });
    } else {
      res.status(404).json({ message: "Project not found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating project." });
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
app.delete('/project/:id', async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (deletedProject) {
      res.status(200).json({ message: "Project deleted successfully!" });
    } else {
      res.status(404).json({ message: "Project not found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting project." });
  }
});

// ====================== Info Routes END ====================== //

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

const mongoose = require('mongoose');

// Define the Info schema
const infoSchema = new mongoose.Schema({
  name: String,
  email: String,
  JobTitle: String,
  Description: String,
  phone: String,
  Fiverr: String,
  Facebook: String,
  Twitter: String,
  Instagram: String,
  Medium: String,
  Quora: String,
  Pinterest: String,
  Github: String,
  Linkedin: String,

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
});

// Indexes for better performance (optional)
infoSchema.index({ name: 1 });

// Create and export the model
const Info = mongoose.model('Info', infoSchema);
module.exports = Info;

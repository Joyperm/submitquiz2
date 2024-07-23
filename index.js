const mongoose = require('mongoose');
const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

// Define the schema
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  myName: { type: String, required: true },
  mySID: { type: String, required: true }
});

// Create a model
const Student = mongoose.model("s24students", studentSchema);

// Serve the form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'form.html'));
});

// Handle form submission
app.post('/', async (req, res) => {
  const uri = req.body.myuri;

  if (!uri) {
    return res.status(400).send('MongoDB URI is required');
  }

  try {
    // Connect to MongoDB
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB with user-provided URI');

    // Create and save a document
    const newStudent = new Student({ myName: 'Sornsawan Permpipat', mySID: '300386177' });
    await newStudent.save();

    res.send('<h1>Student Added</h1>');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).send('Error connecting to MongoDB');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

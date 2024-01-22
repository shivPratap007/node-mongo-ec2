
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Student = require('./studentModel'); // Adjust the path accordingly

const app = express();
const port = 3000;

// Middleware to parse JSON in the request body
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(`mongodb://${MONGO-EC2-IP}/mydatabase`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.get("/",(req,res)=>{

    res.json("Welcome to the website");
})

// Route to handle GET requests
app.get('/data', async (req, res) => {
    try {
      // Retrieve all documents from the database
      const allStudents = await Student.find({}, { _id: 0, __v: 0 });
  
      console.log('All students:', allStudents);
  
      res.status(200).json({ students: allStudents });
    } catch (error) {
      console.error('Error fetching students:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Route to handle POST requests
app.post('/details', async (req, res) => {
  try {
    console.log(req.body);
    const { name, course } = req.body;

    // Use create method to directly insert data into the database
    const createdStudent = await Student.create({ name, course });

    console.log('Student created:', createdStudent);

    res.status(201).json({ message: 'Student added successfully', student: createdStudent });
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// index.js
const express = require('express');
const app = express();
const studentsRoutes = require('./routes/students');


app.use(express.json());  // Middleware to parse JSON
app.use('/api/students', studentsRoutes);


require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Tutoring App API is running.');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

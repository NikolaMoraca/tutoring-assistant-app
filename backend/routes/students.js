const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/studentsController');
const { validateStudent } = require('../middleware/validate');

// List all students with pagination
router.get('/', studentsController.getAllStudents);

// Search for students by name
router.get('/search', studentsController.searchStudents);

// Get a student by ID
router.get('/:id', studentsController.getStudentById);

// Create a new student
router.post('/', validateStudent, studentsController.createStudent);

// Update a student by ID
router.put('/:id', validateStudent, studentsController.updateStudent);

// Delete a student by ID
router.delete('/:id', studentsController.deleteStudent);

module.exports = router;
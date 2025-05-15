const Student = require('../models/studentsModel');

exports.getAllStudents = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Default to page 1, 10 students per page
  const offset = (page - 1) * limit;

  try {
    const students = await Student.getAllStudents(limit, offset);
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.getStudentById(req.params.id);
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.searchStudents = async (req, res) => {
  const { query } = req.query; // e.g., /api/students/search?query=Connor
  try {
    const students = await Student.searchStudents(query);
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createStudent = async (req, res) => {
  try {
    const newStudent = await Student.createStudent(req.body);
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const updated = await Student.updateStudent(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    await Student.deleteStudent(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

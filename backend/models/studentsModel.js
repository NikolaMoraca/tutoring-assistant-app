const db = require('../db/db');

const getAllStudents = async () => {
  const result = await db.query('SELECT * FROM students ORDER BY name ASC');
  return result.rows;
};

const getStudentById = async (id) => {
  const result = await db.query('SELECT * FROM students WHERE id = $1', [id]);
  return result.rows[0];
};

const createStudent = async ({ name, email, pay_rate, zoom_link, weekly_schedule }) => {
  const result = await db.query(
    `INSERT INTO students (name, email, pay_rate, zoom_link, weekly_schedule)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [name, email, pay_rate, zoom_link, weekly_schedule]
  );
  return result.rows[0];
};

const updateStudent = async (id, { name, email, pay_rate, zoom_link, weekly_schedule }) => {
  const result = await db.query(
    `UPDATE students SET name=$1, email=$2, pay_rate=$3, zoom_link=$4, weekly_schedule=$5
     WHERE id=$6 RETURNING *`,
    [name, email, pay_rate, zoom_link, weekly_schedule, id]
  );
  return result.rows[0];
};

const deleteStudent = async (id) => {
  await db.query('DELETE FROM students WHERE id = $1', [id]);
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
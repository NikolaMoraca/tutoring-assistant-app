// seed.js
const pool = require('./backend/db/db');

// Array of test students
const students = [
  { name: 'Connor', email: 'connor@example.com', pay_rate: 50, zoom_link: 'https://zoom.us/j/12345', weekly_schedule: '{"Monday": "10:00 AM", "Wednesday": "3:00 PM"}' },
  { name: 'Ava', email: 'ava@example.com', pay_rate: 55, zoom_link: 'https://zoom.us/j/67890', weekly_schedule: '{"Tuesday": "2:00 PM", "Thursday": "11:00 AM"}' },
];

// Array of test classes
const classes = [
  { student_id: 1, date: '2025-05-10', time: '10:00:00', lesson_name: 'Math - Fractions', lesson_link: 'https://lesson.link/1', status: 'held' },
  { student_id: 1, date: '2025-05-12', time: '10:00:00', lesson_name: 'Math - Algebra', lesson_link: 'https://lesson.link/2', status: 'held' },
  { student_id: 2, date: '2025-05-11', time: '2:00:00', lesson_name: 'Math - Geometry', lesson_link: 'https://lesson.link/3', status: 'held' },
];

// Insert students into the database
async function seedStudents() {
  for (const student of students) {
    const { name, email, pay_rate, zoom_link, weekly_schedule } = student;
    await pool.query(
      'INSERT INTO students (name, email, pay_rate, zoom_link, weekly_schedule) VALUES ($1, $2, $3, $4, $5)',
      [name, email, pay_rate, zoom_link, weekly_schedule]
    );
  }
}

// Insert classes into the database
async function seedClasses() {
  for (const classData of classes) {
    const { student_id, date, time, lesson_name, lesson_link, status } = classData;
    await pool.query(
      'INSERT INTO classes (student_id, date, time, lesson_name, lesson_link, status) VALUES ($1, $2, $3, $4, $5, $6)',
      [student_id, date, time, lesson_name, lesson_link, status]
    );
  }
}

// Run the seed functions
async function seed() {
  try {
    await seedStudents();
    await seedClasses();
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    pool.end();
  }
}

seed();

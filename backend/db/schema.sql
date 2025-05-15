-- schema.sql

-- Drop tables if they already exist (for development resets)
DROP TABLE IF EXISTS homeworks;
DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS classes;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS users;

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT CHECK (role IN ('admin', 'tutor')) DEFAULT 'tutor' NOT NULL
);

-- Students table
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE, -- Link students to a user
    name TEXT NOT NULL,
    email TEXT,
    pay_rate NUMERIC(6, 2) NOT NULL,
    zoom_link TEXT,
    weekly_schedule JSONB  -- Stores structured weekly schedule like {"Monday": "15:00", "Wednesday": "15:00"}
);

-- Classes table
CREATE TABLE classes (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    time TIME,
    lesson_name TEXT,
    lesson_link TEXT,
    status TEXT CHECK (status IN ('held', 'canceled', 'rescheduled')) DEFAULT 'held' NOT NULL,
    rescheduled_to_date DATE,
    rescheduled_to_time TIME
);

-- Payments table
CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
    month INTEGER CHECK (month BETWEEN 1 AND 12),
    year INTEGER,
    scheduled_classes INTEGER DEFAULT 0,
    canceled_from_previous_month INTEGER DEFAULT 0,
    paid_classes INTEGER DEFAULT 0,
    amount_due NUMERIC(8, 2),
    payment_status TEXT CHECK (payment_status IN ('unpaid', 'paid')) DEFAULT 'unpaid'
);

-- Homeworks table
CREATE TABLE homeworks (
    id SERIAL PRIMARY KEY,
    class_id INTEGER REFERENCES classes(id) ON DELETE CASCADE,
    file_url TEXT NOT NULL,
    file_name TEXT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

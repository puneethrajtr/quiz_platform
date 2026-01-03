-- Quiz Platform Database Schema
-- PostgreSQL

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Quizzes Table
CREATE TABLE IF NOT EXISTS quizzes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    time_limit INTEGER NOT NULL, -- in minutes
    status VARCHAR(20) NOT NULL DEFAULT 'draft', -- 'draft' or 'published'
    author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Questions Table
CREATE TABLE IF NOT EXISTS questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quiz_id UUID NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    option1 VARCHAR(500) NOT NULL,
    option2 VARCHAR(500) NOT NULL,
    option3 VARCHAR(500) NOT NULL,
    option4 VARCHAR(500) NOT NULL,
    correct_option INTEGER NOT NULL, -- 1, 2, 3, or 4
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Attempts Table
CREATE TABLE IF NOT EXISTS attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quiz_id UUID NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    score INTEGER NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_quizzes_author ON quizzes(author_id);
CREATE INDEX IF NOT EXISTS idx_quizzes_status ON quizzes(status);
CREATE INDEX IF NOT EXISTS idx_questions_quiz ON questions(quiz_id);
CREATE INDEX IF NOT EXISTS idx_attempts_user ON attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_attempts_quiz ON attempts(quiz_id);

-- Sample data (optional - for testing)
-- Uncomment below to add sample data

/*
-- Sample User
INSERT INTO users (id, email, password) VALUES 
('550e8400-e29b-41d4-a716-446655440000', 'test@example.com', '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890'); -- password: 'password123'

-- Sample Quiz
INSERT INTO quizzes (id, title, description, time_limit, status, author_id) VALUES 
('660e8400-e29b-41d4-a716-446655440000', 'Sample Quiz', 'This is a sample quiz to test the application', 10, 'published', '550e8400-e29b-41d4-a716-446655440000');

-- Sample Questions
INSERT INTO questions (id, quiz_id, question_text, option1, option2, option3, option4, correct_option) VALUES 
('770e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440000', 'What is 2 + 2?', '3', '4', '5', '6', 2),
('770e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440000', 'What is the capital of France?', 'London', 'Berlin', 'Paris', 'Madrid', 3);
*/

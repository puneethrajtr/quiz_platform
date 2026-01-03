const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const {
  createQuiz,
  getMyQuizzes,
  getPublishedQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz,
  submitQuiz,
} = require('../controllers/quiz.controller');

/**
 * Quiz Routes
 */

// POST /api/quizzes - Create a new quiz (Protected)
router.post('/', authMiddleware, createQuiz);

// GET /api/quizzes/my-quizzes - Get all quizzes by logged-in user (Protected)
router.get('/my-quizzes', authMiddleware, getMyQuizzes);

// GET /api/quizzes/published - Get all published quizzes
router.get('/published', getPublishedQuizzes);

// GET /api/quizzes/:id - Get a single quiz by ID
router.get('/:id', getQuizById);

// PUT /api/quizzes/:id - Update a quiz (Protected)
router.put('/:id', authMiddleware, updateQuiz);

// DELETE /api/quizzes/:id - Delete a quiz (Protected)
router.delete('/:id', authMiddleware, deleteQuiz);

// POST /api/quizzes/:id/submit - Submit quiz answers (Protected)
router.post('/:id/submit', authMiddleware, submitQuiz);

module.exports = router;

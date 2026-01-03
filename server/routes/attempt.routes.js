const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const { getMyAttempts } = require('../controllers/attempt.controller');

/**
 * Attempt Routes
 */

// GET /api/attempts/my-attempts - Get all attempts by logged-in user (Protected)
router.get('/my-attempts', authMiddleware, getMyAttempts);

module.exports = router;

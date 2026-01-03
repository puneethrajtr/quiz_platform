const pool = require('../config/db');

/**
 * Get all quiz attempts by the logged-in user
 */
const getMyAttempts = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      `SELECT a.*, q.title as quiz_title, 
       (SELECT COUNT(*) FROM questions WHERE quiz_id = q.id) as total_questions
       FROM attempts a 
       JOIN quizzes q ON a.quiz_id = q.id 
       WHERE a.user_id = $1 
       ORDER BY a.submitted_at DESC`,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get my attempts error:', error);
    res.status(500).json({ message: 'Server error while fetching attempts' });
  }
};

module.exports = {
  getMyAttempts,
};

const { v4: uuidv4 } = require('uuid');
const pool = require('../config/db');

/**
 * Create a new quiz
 */
const createQuiz = async (req, res) => {
  const { title, description, time_limit, status, questions } = req.body;
  const authorId = req.user.id;

  // Start a transaction
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Validation
    if (!title || !description || !time_limit || !questions || questions.length === 0) {
      await client.query('ROLLBACK');
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Insert quiz
    const quizId = uuidv4();
    const quizResult = await client.query(
      'INSERT INTO quizzes (id, title, description, time_limit, status, author_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [quizId, title, description, time_limit, status || 'draft', authorId]
    );

    // Insert questions
    for (const question of questions) {
      const questionId = uuidv4();
      await client.query(
        'INSERT INTO questions (id, quiz_id, question_text, option1, option2, option3, option4, correct_option) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
        [
          questionId,
          quizId,
          question.question_text,
          question.option1,
          question.option2,
          question.option3,
          question.option4,
          question.correct_option,
        ]
      );
    }

    await client.query('COMMIT');

    res.status(201).json({
      message: 'Quiz created successfully',
      quiz: quizResult.rows[0],
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Create quiz error:', error);
    res.status(500).json({ message: 'Server error while creating quiz' });
  } finally {
    client.release();
  }
};

/**
 * Get all quizzes created by the logged-in user
 */
const getMyQuizzes = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      `SELECT q.*, COUNT(qs.id) as question_count 
       FROM quizzes q 
       LEFT JOIN questions qs ON q.id = qs.quiz_id 
       WHERE q.author_id = $1 
       GROUP BY q.id 
       ORDER BY q.created_at DESC`,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get my quizzes error:', error);
    res.status(500).json({ message: 'Server error while fetching quizzes' });
  }
};

/**
 * Get all published quizzes
 */
const getPublishedQuizzes = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT q.*, u.email as author_email, COUNT(qs.id) as question_count 
       FROM quizzes q 
       JOIN users u ON q.author_id = u.id 
       LEFT JOIN questions qs ON q.id = qs.quiz_id 
       WHERE q.status = 'published' 
       GROUP BY q.id, u.email 
       ORDER BY q.created_at DESC`
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get published quizzes error:', error);
    res.status(500).json({ message: 'Server error while fetching quizzes' });
  }
};

/**
 * Get a single quiz by ID
 */
const getQuizById = async (req, res) => {
  const { id } = req.params;

  try {
    // Get quiz details
    const quizResult = await pool.query('SELECT * FROM quizzes WHERE id = $1', [id]);
    
    if (quizResult.rows.length === 0) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    const quiz = quizResult.rows[0];

    // Get questions for the quiz
    const questionsResult = await pool.query(
      'SELECT * FROM questions WHERE quiz_id = $1 ORDER BY created_at',
      [id]
    );

    res.json({
      ...quiz,
      questions: questionsResult.rows,
    });
  } catch (error) {
    console.error('Get quiz error:', error);
    res.status(500).json({ message: 'Server error while fetching quiz' });
  }
};

/**
 * Update a quiz
 */
const updateQuiz = async (req, res) => {
  const { id } = req.params;
  const { title, description, time_limit, status, questions } = req.body;
  const userId = req.user.id;

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Check if quiz exists and belongs to user
    const quizCheck = await client.query('SELECT * FROM quizzes WHERE id = $1', [id]);
    
    if (quizCheck.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ message: 'Quiz not found' });
    }

    if (quizCheck.rows[0].author_id !== userId) {
      await client.query('ROLLBACK');
      return res.status(403).json({ message: 'Unauthorized to update this quiz' });
    }

    // Update quiz
    await client.query(
      'UPDATE quizzes SET title = $1, description = $2, time_limit = $3, status = $4 WHERE id = $5',
      [title, description, time_limit, status || 'draft', id]
    );

    // Delete existing questions
    await client.query('DELETE FROM questions WHERE quiz_id = $1', [id]);

    // Insert new questions
    for (const question of questions) {
      const questionId = question.id || uuidv4();
      await client.query(
        'INSERT INTO questions (id, quiz_id, question_text, option1, option2, option3, option4, correct_option) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
        [
          questionId,
          id,
          question.question_text,
          question.option1,
          question.option2,
          question.option3,
          question.option4,
          question.correct_option,
        ]
      );
    }

    await client.query('COMMIT');

    res.json({ message: 'Quiz updated successfully' });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Update quiz error:', error);
    res.status(500).json({ message: 'Server error while updating quiz' });
  } finally {
    client.release();
  }
};

/**
 * Delete a quiz
 */
const deleteQuiz = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Check if quiz exists and belongs to user
    const quizCheck = await client.query('SELECT * FROM quizzes WHERE id = $1', [id]);
    
    if (quizCheck.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ message: 'Quiz not found' });
    }

    if (quizCheck.rows[0].author_id !== userId) {
      await client.query('ROLLBACK');
      return res.status(403).json({ message: 'Unauthorized to delete this quiz' });
    }

    // Delete questions (cascade will handle this, but explicit for clarity)
    await client.query('DELETE FROM questions WHERE quiz_id = $1', [id]);
    
    // Delete attempts
    await client.query('DELETE FROM attempts WHERE quiz_id = $1', [id]);

    // Delete quiz
    await client.query('DELETE FROM quizzes WHERE id = $1', [id]);

    await client.query('COMMIT');

    res.json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Delete quiz error:', error);
    res.status(500).json({ message: 'Server error while deleting quiz' });
  } finally {
    client.release();
  }
};

/**
 * Submit quiz answers and calculate score
 */
const submitQuiz = async (req, res) => {
  const { id } = req.params;
  const { answers } = req.body;
  const userId = req.user.id;

  try {
    // Get all questions for the quiz
    const questionsResult = await pool.query(
      'SELECT id, correct_option FROM questions WHERE quiz_id = $1',
      [id]
    );

    const questions = questionsResult.rows;
    
    // Calculate score
    let score = 0;
    const answerMap = {};
    
    if (answers && Array.isArray(answers)) {
      answers.forEach((ans) => {
        answerMap[ans.question_id] = ans.selected_option;
      });
    }

    questions.forEach((question) => {
      const selectedOption = answerMap[question.id];
      if (selectedOption === question.correct_option) {
        score++;
      }
    });

    // Save attempt
    const attemptId = uuidv4();
    await pool.query(
      'INSERT INTO attempts (id, quiz_id, user_id, score) VALUES ($1, $2, $3, $4)',
      [attemptId, id, userId, score]
    );

    res.json({
      message: 'Quiz submitted successfully',
      score,
      total: questions.length,
    });
  } catch (error) {
    console.error('Submit quiz error:', error);
    res.status(500).json({ message: 'Server error while submitting quiz' });
  }
};

module.exports = {
  createQuiz,
  getMyQuizzes,
  getPublishedQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz,
  submitQuiz,
};

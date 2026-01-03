import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyQuizzes, deleteQuiz } from '../services/quizService';

/**
 * My Quizzes Page Component
 * Displays all quizzes created by the logged-in user
 */
const MyQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMyQuizzes();
  }, []);

  const fetchMyQuizzes = async () => {
    try {
      const data = await getMyQuizzes();
      setQuizzes(data);
    } catch (err) {
      setError(err.message || 'Failed to load quizzes');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (quizId) => {
    if (!window.confirm('Are you sure you want to delete this quiz?')) {
      return;
    }

    try {
      await deleteQuiz(quizId);
      setQuizzes(quizzes.filter((q) => q.id !== quizId));
    } catch (err) {
      setError(err.message || 'Failed to delete quiz');
    }
  };

  if (loading) {
    return <div className="container loading">Loading your quizzes...</div>;
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>My Quizzes</h2>
        <Link to="/create-quiz">
          <button className="btn btn-primary">Create New Quiz</button>
        </Link>
      </div>

      {error && <div className="error-message">{error}</div>}

      {quizzes.length === 0 ? (
        <div className="card">
          <p>You haven't created any quizzes yet.</p>
          <Link to="/create-quiz">
            <button className="btn btn-primary" style={{ marginTop: '10px' }}>
              Create Your First Quiz
            </button>
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ flex: 1 }}>
                  <h3>{quiz.title}</h3>
                  <p style={{ color: '#666', marginTop: '10px' }}>{quiz.description}</p>
                  <div style={{ marginTop: '15px', color: '#888', fontSize: '14px' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '3px 10px',
                      borderRadius: '3px',
                      backgroundColor: quiz.status === 'published' ? '#28a745' : '#6c757d',
                      color: 'white',
                      marginRight: '10px'
                    }}>
                      {quiz.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                    <span>⏱️ {quiz.time_limit} min</span>
                    <span style={{ marginLeft: '15px' }}>📝 {quiz.question_count || 0} questions</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '10px', marginLeft: '20px' }}>
                  <Link to={`/edit-quiz/${quiz.id}`}>
                    <button className="btn btn-primary">Edit</button>
                  </Link>
                  <button
                    onClick={() => handleDelete(quiz.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyQuizzes;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPublishedQuizzes } from '../services/quizService';

/**
 * Home Page Component
 * Displays all published quizzes
 */
const Home = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const data = await getPublishedQuizzes();
      setQuizzes(data);
    } catch (err) {
      setError(err.message || 'Failed to load quizzes');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container loading">Loading quizzes...</div>;
  }

  return (
    <div className="container">
      <h2 style={{ marginBottom: '20px' }}>Available Quizzes</h2>
      {error && <div className="error-message">{error}</div>}
      
      {quizzes.length === 0 ? (
        <div className="card">
          <p>No quizzes available yet. Create your first quiz!</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="card">
              <h3>{quiz.title}</h3>
              <p style={{ color: '#666', marginTop: '10px' }}>{quiz.description}</p>
              <div style={{ marginTop: '15px', color: '#888', fontSize: '14px' }}>
                <p>⏱️ Time Limit: {quiz.time_limit} minutes</p>
                <p>📝 Questions: {quiz.question_count || 0}</p>
                <p>👤 By: {quiz.author_email}</p>
              </div>
              <Link to={`/take-quiz/${quiz.id}`}>
                <button className="btn btn-primary" style={{ marginTop: '15px', width: '100%' }}>
                  Take Quiz
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;

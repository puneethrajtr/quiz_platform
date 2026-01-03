import React, { useState, useEffect } from 'react';
import { getMyQuizzes, getMyAttempts } from '../services/quizService';
import { useAuth } from '../context/AuthContext';

/**
 * Profile Page Component
 * Shows user's quiz creation history and attempt history
 */
const Profile = () => {
  const { user } = useAuth();
  const [myQuizzes, setMyQuizzes] = useState([]);
  const [myAttempts, setMyAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [quizzesData, attemptsData] = await Promise.all([
        getMyQuizzes(),
        getMyAttempts(),
      ]);
      setMyQuizzes(quizzesData);
      setMyAttempts(attemptsData);
    } catch (err) {
      setError(err.message || 'Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container loading">Loading profile...</div>;
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Profile</h2>
        <p style={{ marginTop: '10px', fontSize: '18px' }}>
          <strong>Email:</strong> {user?.email}
        </p>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Quiz Creation History</h3>
        </div>
        {error && <div className="error-message">{error}</div>}
        
        {myQuizzes.length === 0 ? (
          <p>You haven't created any quizzes yet.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #ddd' }}>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Title</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Status</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Questions</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Created</th>
                </tr>
              </thead>
              <tbody>
                {myQuizzes.map((quiz) => (
                  <tr key={quiz.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '10px' }}>{quiz.title}</td>
                    <td style={{ padding: '10px' }}>
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: '3px',
                        backgroundColor: quiz.status === 'published' ? '#28a745' : '#6c757d',
                        color: 'white',
                        fontSize: '12px',
                      }}>
                        {quiz.status}
                      </span>
                    </td>
                    <td style={{ padding: '10px' }}>{quiz.question_count || 0}</td>
                    <td style={{ padding: '10px' }}>
                      {new Date(quiz.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Quiz Attempt History</h3>
        </div>
        
        {myAttempts.length === 0 ? (
          <p>You haven't taken any quizzes yet.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #ddd' }}>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Quiz Title</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Score</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Percentage</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {myAttempts.map((attempt) => {
                  const percentage = attempt.total_questions > 0
                    ? Math.round((attempt.score / attempt.total_questions) * 100)
                    : 0;
                  return (
                    <tr key={attempt.id} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '10px' }}>{attempt.quiz_title}</td>
                      <td style={{ padding: '10px' }}>
                        {attempt.score} / {attempt.total_questions}
                      </td>
                      <td style={{ padding: '10px' }}>
                        <span style={{
                          color: percentage >= 70 ? '#28a745' : percentage >= 50 ? '#ffc107' : '#dc3545',
                          fontWeight: 'bold',
                        }}>
                          {percentage}%
                        </span>
                      </td>
                      <td style={{ padding: '10px' }}>
                        {new Date(attempt.submitted_at).toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

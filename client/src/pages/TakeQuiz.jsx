import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuizById, submitQuizAnswers } from '../services/quizService';

/**
 * Take Quiz Page Component
 * Allows users to take a quiz with countdown timer
 */
const TakeQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetchQuiz();
  }, [id]);

  useEffect(() => {
    if (timeLeft > 0 && !result) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && quiz && !result) {
      // Auto-submit when time expires
      handleSubmit();
    }
  }, [timeLeft, result, quiz]);

  const fetchQuiz = async () => {
    try {
      const data = await getQuizById(id);
      setQuiz(data);
      setTimeLeft(data.time_limit * 60); // Convert minutes to seconds
    } catch (err) {
      setError(err.message || 'Failed to load quiz');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId, option) => {
    setAnswers({
      ...answers,
      [questionId]: option,
    });
  };

  const handleSubmit = async () => {
    if (submitting) return;

    setSubmitting(true);
    setError('');

    try {
      const answersArray = Object.entries(answers).map(([questionId, selectedOption]) => ({
        question_id: questionId,
        selected_option: selectedOption,
      }));

      const resultData = await submitQuizAnswers(id, answersArray);
      setResult(resultData);
    } catch (err) {
      setError(err.message || 'Failed to submit quiz');
      setSubmitting(false);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return <div className="container loading">Loading quiz...</div>;
  }

  if (error && !quiz) {
    return (
      <div className="container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  if (result) {
    const percentage = quiz.questions.length > 0 
      ? Math.round((result.score / quiz.questions.length) * 100) 
      : 0;

    return (
      <div className="container">
        <div className="card" style={{ maxWidth: '600px', margin: '50px auto', textAlign: 'center' }}>
          <h2>Quiz Completed!</h2>
          <div style={{ fontSize: '48px', margin: '30px 0', color: '#28a745' }}>
            {result.score} / {quiz.questions.length}
          </div>
          <div style={{ fontSize: '24px', color: '#666' }}>
            Score: {percentage}%
          </div>
          <div style={{ marginTop: '30px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button onClick={() => navigate('/')} className="btn btn-primary">
              Back to Home
            </button>
            <button onClick={() => navigate('/profile')} className="btn btn-secondary">
              View History
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h2>{quiz.title}</h2>
            <p style={{ color: '#666' }}>{quiz.description}</p>
          </div>
          <div style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: timeLeft < 60 ? '#dc3545' : '#28a745',
            padding: '10px 20px',
            border: '2px solid',
            borderRadius: '5px',
          }}>
            ⏱️ {formatTime(timeLeft)}
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div style={{ marginTop: '30px' }}>
          {quiz.questions && quiz.questions.map((question, index) => (
            <div key={question.id} className="card">
              <h3>Question {index + 1}</h3>
              <p style={{ fontSize: '18px', marginTop: '10px' }}>{question.question_text}</p>
              
              <div style={{ marginTop: '20px' }}>
                {[1, 2, 3, 4].map((optNum) => (
                  <label
                    key={optNum}
                    style={{
                      display: 'block',
                      padding: '12px',
                      margin: '8px 0',
                      backgroundColor: answers[question.id] === optNum ? '#007bff' : '#f8f9fa',
                      color: answers[question.id] === optNum ? 'white' : '#333',
                      border: '2px solid',
                      borderColor: answers[question.id] === optNum ? '#007bff' : '#ddd',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                    }}
                  >
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={optNum}
                      checked={answers[question.id] === optNum}
                      onChange={() => handleAnswerChange(question.id, optNum)}
                      style={{ marginRight: '10px' }}
                    />
                    {question[`option${optNum}`]}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="btn btn-success"
          style={{ marginTop: '30px', fontSize: '18px', padding: '15px 30px' }}
          disabled={submitting || Object.keys(answers).length === 0}
        >
          {submitting ? 'Submitting...' : 'Submit Quiz'}
        </button>
      </div>
    </div>
  );
};

export default TakeQuiz;

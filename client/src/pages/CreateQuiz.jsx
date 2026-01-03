import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createQuiz } from '../services/quizService';

/**
 * Create Quiz Page Component
 */
const CreateQuiz = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    time_limit: 30,
    status: 'draft',
  });
  const [questions, setQuestions] = useState([
    {
      question_text: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      correct_option: 1,
    },
  ]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question_text: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        correct_option: 1,
      },
    ]);
  };

  const removeQuestion = (index) => {
    if (questions.length > 1) {
      const updatedQuestions = questions.filter((_, i) => i !== index);
      setQuestions(updatedQuestions);
    }
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError('Quiz title is required');
      return false;
    }
    if (!formData.description.trim()) {
      setError('Quiz description is required');
      return false;
    }
    if (formData.time_limit < 1) {
      setError('Time limit must be at least 1 minute');
      return false;
    }
    if (questions.length === 0) {
      setError('At least one question is required');
      return false;
    }

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.question_text.trim()) {
        setError(`Question ${i + 1}: Question text is required`);
        return false;
      }
      if (!q.option1.trim() || !q.option2.trim() || !q.option3.trim() || !q.option4.trim()) {
        setError(`Question ${i + 1}: All options are required`);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (status) => {
    setError('');
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const quizData = {
        ...formData,
        status,
        questions,
      };
      await createQuiz(quizData);
      navigate('/my-quizzes');
    } catch (err) {
      setError(err.message || 'Failed to create quiz');
    } finally {
      setLoading(false);
    }
  };

  if (showPreview) {
    return (
      <div className="container">
        <div className="card">
          <div className="card-header">
            <h2>Quiz Preview</h2>
          </div>
          <h3>{formData.title}</h3>
          <p>{formData.description}</p>
          <p><strong>Time Limit:</strong> {formData.time_limit} minutes</p>
          
          <div style={{ marginTop: '30px' }}>
            {questions.map((q, index) => (
              <div key={index} className="card">
                <h4>Question {index + 1}</h4>
                <p style={{ fontSize: '18px', marginTop: '10px' }}>{q.question_text}</p>
                <div style={{ marginTop: '15px' }}>
                  {[1, 2, 3, 4].map((optNum) => (
                    <div
                      key={optNum}
                      style={{
                        padding: '10px',
                        margin: '5px 0',
                        backgroundColor: q.correct_option === optNum ? '#d4edda' : '#f8f9fa',
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                      }}
                    >
                      {optNum}. {q[`option${optNum}`]}
                      {q.correct_option === optNum && ' ✓ (Correct)'}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <button onClick={() => setShowPreview(false)} className="btn btn-secondary">
            Back to Edit
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h2>Create New Quiz</h2>
        </div>
        
        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="title">Quiz Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter quiz title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter quiz description"
          />
        </div>

        <div className="form-group">
          <label htmlFor="time_limit">Time Limit (minutes)</label>
          <input
            type="number"
            id="time_limit"
            name="time_limit"
            value={formData.time_limit}
            onChange={handleChange}
            min="1"
          />
        </div>

        <hr style={{ margin: '30px 0' }} />

        <h3>Questions</h3>
        
        {questions.map((question, qIndex) => (
          <div key={qIndex} className="card" style={{ marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4>Question {qIndex + 1}</h4>
              {questions.length > 1 && (
                <button
                  onClick={() => removeQuestion(qIndex)}
                  className="btn btn-danger"
                  type="button"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="form-group">
              <label>Question Text</label>
              <textarea
                value={question.question_text}
                onChange={(e) => handleQuestionChange(qIndex, 'question_text', e.target.value)}
                placeholder="Enter question text"
              />
            </div>

            {[1, 2, 3, 4].map((optNum) => (
              <div key={optNum} className="form-group">
                <label>Option {optNum}</label>
                <input
                  type="text"
                  value={question[`option${optNum}`]}
                  onChange={(e) => handleQuestionChange(qIndex, `option${optNum}`, e.target.value)}
                  placeholder={`Enter option ${optNum}`}
                />
              </div>
            ))}

            <div className="form-group">
              <label>Correct Answer</label>
              <select
                value={question.correct_option}
                onChange={(e) => handleQuestionChange(qIndex, 'correct_option', parseInt(e.target.value))}
              >
                <option value={1}>Option 1</option>
                <option value={2}>Option 2</option>
                <option value={3}>Option 3</option>
                <option value={4}>Option 4</option>
              </select>
            </div>
          </div>
        ))}

        <button onClick={addQuestion} className="btn btn-secondary" style={{ marginTop: '20px' }}>
          + Add Question
        </button>

        <hr style={{ margin: '30px 0' }} />

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={() => handleSubmit('draft')}
            className="btn btn-secondary"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save as Draft'}
          </button>
          <button
            onClick={() => handleSubmit('published')}
            className="btn btn-success"
            disabled={loading}
          >
            {loading ? 'Publishing...' : 'Publish Quiz'}
          </button>
          <button
            onClick={() => setShowPreview(true)}
            className="btn btn-primary"
            type="button"
          >
            Preview Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateQuiz;

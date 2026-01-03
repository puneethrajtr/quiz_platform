import api from './api';

/**
 * Create a new quiz
 */
export const createQuiz = async (quizData) => {
  try {
    const response = await api.post('/quizzes', quizData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create quiz' };
  }
};

/**
 * Get all quizzes created by the current user
 */
export const getMyQuizzes = async () => {
  try {
    const response = await api.get('/quizzes/my-quizzes');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch quizzes' };
  }
};

/**
 * Get all published quizzes
 */
export const getPublishedQuizzes = async () => {
  try {
    const response = await api.get('/quizzes/published');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch quizzes' };
  }
};

/**
 * Get a single quiz by ID
 */
export const getQuizById = async (quizId) => {
  try {
    const response = await api.get(`/quizzes/${quizId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch quiz' };
  }
};

/**
 * Update a quiz
 */
export const updateQuiz = async (quizId, quizData) => {
  try {
    const response = await api.put(`/quizzes/${quizId}`, quizData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update quiz' };
  }
};

/**
 * Delete a quiz
 */
export const deleteQuiz = async (quizId) => {
  try {
    const response = await api.delete(`/quizzes/${quizId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete quiz' };
  }
};

/**
 * Submit quiz answers
 */
export const submitQuizAnswers = async (quizId, answers) => {
  try {
    const response = await api.post(`/quizzes/${quizId}/submit`, { answers });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to submit quiz' };
  }
};

/**
 * Get user's quiz attempts
 */
export const getMyAttempts = async () => {
  try {
    const response = await api.get('/attempts/my-attempts');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch attempts' };
  }
};

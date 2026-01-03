import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './routes/PrivateRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateQuiz from './pages/CreateQuiz';
import EditQuiz from './pages/EditQuiz';
import MyQuizzes from './pages/MyQuizzes';
import TakeQuiz from './pages/TakeQuiz';
import Profile from './pages/Profile';

/**
 * Main App Component
 * Handles routing and authentication
 */
function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/take-quiz/:id" element={<TakeQuiz />} />

            {/* Protected Routes */}
            <Route
              path="/create-quiz"
              element={
                <PrivateRoute>
                  <CreateQuiz />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit-quiz/:id"
              element={
                <PrivateRoute>
                  <EditQuiz />
                </PrivateRoute>
              }
            />
            <Route
              path="/my-quizzes"
              element={
                <PrivateRoute>
                  <MyQuizzes />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />

            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;

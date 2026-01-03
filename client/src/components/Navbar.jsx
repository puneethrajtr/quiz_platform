import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Navigation Bar Component
 */
const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <div className="navbar">
      <div className="container">
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
          <h1>Quiz Platform</h1>
        </Link>
        <nav>
          {isAuthenticated ? (
            <>
              <Link to="/">Home</Link>
              <Link to="/my-quizzes">My Quizzes</Link>
              <Link to="/create-quiz">Create Quiz</Link>
              <Link to="/profile">Profile</Link>
              <button onClick={logout}>Logout ({user?.email})</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;

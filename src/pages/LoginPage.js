import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.css'; // Custom styles

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('User');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Placeholder for the login logic (can be replaced with an API call)
    if (username && password && role) {
      // Navigate based on role
      if (role === 'Admin') {
        navigate('/admin'); // Navigate to admin panel
      } else if (role === 'Technician' || role === 'Assignee') {
        navigate('/admin'); // Both Technician and Assignee go to admin panel
      } else if (role === 'User') {
        navigate('/dashboard'); // Navigate to user dashboard
      } else {
        alert('Invalid role!');
      }
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome to Techtronix</h2>
        <p>Your trusted electronics solution provider</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="User">User</option>
              <option value="Technician">Technician</option>
              <option value="Assignee">Assignee</option>
            </select>
          </div>

          <button type="submit" className="login-button">Login</button>

          <p className="login-footer">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
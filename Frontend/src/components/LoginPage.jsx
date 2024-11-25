import React, { useState, useEffect } from 'react';
import '../css/loginpage.css'; // Import your CSS file
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // For error handling
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Implement secure authentication logic using a secure API call
    try {
      const response = await fetch('http://localhost:5000/api/users/login', { // Correct URL (replace if necessary)
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed'); // Handle non-2xx response status
      }

      const data = await response.json(); // Parse response data
      localStorage.setItem('username', data.name);
      sessionStorage.setItem('token',data.token);
      console.log('Token:', sessionStorage.getItem('token'));
      // Successful login (data should contain relevant user information)
    
      
     
       // Store user data securely (consider alternatives)
      navigate('/dashboard'); // Redirect to dashboard after successful login
    } catch (error) {
      setErrorMessage(error.message || 'Login failed'); // Display generic error message or specific error if available
    }
  };

  // Check if user is already logged in and redirect to dashboard (optional)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      navigate('/dashboard');
    }
  }, [navigate]); // Dependency array to prevent infinite loop

  return (
    <div className="login-page">
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Login</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
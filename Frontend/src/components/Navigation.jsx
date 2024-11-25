import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/navigation.css';

const Navigation = () => {
  const [user, setUser] = useState({ username: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUser({ username: storedUsername });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    setUser({});
    navigate('/');
  };

  return (
    <div className="admin-panel">
      <header className="header">
        <nav className="nav-bar">
          <ul className="nav-links">
            <li><a href="/dashboard">Home</a></li>
            <li><a href="/employeelist">Employee List</a></li>
          </ul>
          <div className="user-info">
            {user.username ? (
              <span>{user.username}</span>
            ) : (
              <span>Not logged in</span>
            )}
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navigation;
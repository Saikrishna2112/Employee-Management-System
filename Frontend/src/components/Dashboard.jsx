import React from 'react';
import '../css/dashboard.css';
import Navigation from './navigation';

function AdminPanel() {
  return (
    <div>
      <Navigation />
      <main className="main-content">
        <div className="dashboard">
          <h1>Dashboard</h1>
        </div>
        <div className="content">
          <h2>Welcome Admin Panel</h2>
          {/* Your additional content goes here */}
        </div>
      </main>
    </div>
  );
}

export default AdminPanel;

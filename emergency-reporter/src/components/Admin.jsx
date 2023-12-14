import React, { useState } from 'react';
import MessageBoard from './MessageBoard';
import EmergencyForm from './EmergencyForm';

const Admin = () => {
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    if (password === '1234') {
      setLoggedIn(true);
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <div className="component">
      {!loggedIn ? (
        <div>
          <h2>Admin Login</h2>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div>
          <h2>Admin Dashboard</h2>
          <MessageBoard isAdmin />
          <EmergencyForm />
        </div>
      )}
    </div>
  );
};

export default Admin;

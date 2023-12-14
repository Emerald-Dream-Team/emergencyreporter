import React, { useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // Update with your server URL

const EmergencyForm = () => {
  const [emergencyMessage, setEmergencyMessage] = useState('');

  const handleSubmit = () => {
    socket.emit('emergency-message', emergencyMessage);
    setEmergencyMessage('');
  };

  return (
    <div>
      <h3>Report an Emergency</h3>
      <textarea
        rows="4"
        placeholder="Type your emergency message here"
        value={emergencyMessage}
        onChange={(e) => setEmergencyMessage(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default EmergencyForm;

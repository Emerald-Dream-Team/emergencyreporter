import React from 'react';
import Admin from './components/Admin';
import Client from './components/Client';

const App = () => {
  return (
    <div>
      <h1>Emergency Reporter App</h1>
      <div>
        <Admin />
        <Client />
      </div>
    </div>
  );
};

export default App;

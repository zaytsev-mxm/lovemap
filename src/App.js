import React from 'react';
import logo from './logo.svg';
import './App.css';

import Lovemap from './components/Lovemap/Lovemap';

// eslint-disable-next-line
const OldApp = () => {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  );
};

function App() {
  return (
    <div className="App">
      <Lovemap />
    </div>
  );
}

export default App;

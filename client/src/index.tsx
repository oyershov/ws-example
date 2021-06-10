import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const ws = new WebSocket('ws://localhost:9898/');
    
ws.onopen = function() {
  console.log('WebSocket Client Connected');
  ws.send('Hi this is web client.');
};

ReactDOM.render(
  <React.StrictMode>
    <App ws={ws} />
  </React.StrictMode>,
  document.getElementById('root')
);


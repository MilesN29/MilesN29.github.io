import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css'; // This is optional if you have styles
import App from './App'; // The main component of your app


// Render the App component inside the root div in public/index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Підключення стилів
import App from './App'; // Підключення основного компонента

// Рендеримо компонент App в елемент з id="root" з index.html
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

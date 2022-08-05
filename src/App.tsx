import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="container">
        {window.location.href}
        <Routes>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { LogoContainer } from './components/logo';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <LogoContainer />
      <div className="container">
        {window.location.href}
        <Routes>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

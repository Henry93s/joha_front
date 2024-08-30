import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import MainPage from '../src/pages/MainPage';
import SchedulePage from './pages/SchedulePage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path='/schedule' element={<SchedulePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

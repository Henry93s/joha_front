import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import MainPage from '../src/pages/MainPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

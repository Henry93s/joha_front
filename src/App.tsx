import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import MainPage from "../src/pages/MainPage";
import Inquiry from "./pages/InquiryPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/inquiry" element={<Inquiry />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

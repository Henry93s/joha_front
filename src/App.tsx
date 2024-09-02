import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import MainPage from "../src/pages/MainPage";
import InquiryPage from "../src/pages/InquiryPage";
import LoginPage from "../src/pages/LoginPage";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={<MainPage />}
                    />
                    <Route
                        path="/inquiry"
                        element={<InquiryPage />}
                    />
                    <Route
                        path="/login"
                        element={<LoginPage />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

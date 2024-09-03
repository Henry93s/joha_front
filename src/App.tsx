import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import MainPage from "../src/pages/MainPage";
import InquiryPage from "../src/pages/InquiryPage";
import LoginPage from "../src/pages/LoginPage";
import JoinPage from "./pages/JoinPage";
import JoinEndPage from "./pages/JoinEndPage";
import SchedulePage from "./pages/SchedulePage";

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
                    <Route
                        path="/join"
                        element={<JoinPage />}
                    />
                    <Route
                        path="/joinEnd"
                        element={<JoinEndPage />}
                    />
                    <Route
                        path="/schedule"
                        element={<SchedulePage />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

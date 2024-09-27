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
import FindIdPage from "./pages/FindIdPage";
import FindPasswordPage from "./pages/FindPasswordPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import AdminIntroPage from "./pages/AdminPage/AdminIntroPage";
import AdminUserListPage from "./pages/AdminPage/AdminUserListPage";
import AdminUserDetailPage from "./pages/AdminPage/AdminUserDetailPage";

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
                        path="/findId"
                        element={<FindIdPage />}
                    />
                    <Route
                        path="/findPassword"
                        element={<FindPasswordPage />}
                    />
                    <Route
                        path="/ChangePassword"
                        element={<ChangePasswordPage />}
                    />
                    <Route
                        path="/schedule"
                        element={<SchedulePage />}
                    />
                    <Route
                        path="/admin"
                        element={<AdminIntroPage />}
                    />
                    <Route
                        path="/admin/userList"
                        element={<AdminUserListPage />}
                    />
                    <Route
                        path="/admin/userList/:email"
                        element={<AdminUserDetailPage />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

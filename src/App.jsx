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
import SearchPage from "./pages/SearchPage";
import LessonSearchPage from "./pages/LessonSearchPage";
import StoryPage from "./pages/StoryPage";
import StoryViewPage from "./pages/StoryViewPage";
import StoryPostPage from "./pages/StoryPostPage";
import WishListPage from "./pages/WishListPage";
import StoryEditPage from "./pages/StoryEditPage";
import ClassUpload from "./pages/ClassUpload";
import MyClassesPage from "./pages/MyClassesPage";
import { AnimatePresence } from "framer-motion";
import ProfilePage from "./pages/ProfilePage";
import ProfileEditPage from "./pages/ProfileEditPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AnimatePresence>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/inquiry" element={<InquiryPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/join" element={<JoinPage />} />
                <Route path="/joinEnd" element={<JoinEndPage />} />
                <Route path="/findId" element={<FindIdPage />} />
                <Route path="/findPassword" element={<FindPasswordPage />} />
                <Route path="/ChangePassword" element={<ChangePasswordPage />} />
                <Route path="/schedule" element={<SchedulePage />} />
                <Route path="/admin" element={<AdminIntroPage />} />
                <Route path="/admin/userList" element={<AdminUserListPage />} />
                <Route path="/admin/userList/:email" element={<AdminUserDetailPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/lesson_search" element={<LessonSearchPage />} />
                <Route path="/story" element={<StoryPage />} />
                <Route path="/story/edit" element={<StoryEditPage />} />
                <Route path="/story/view" element={<StoryViewPage />} />
                <Route path="/story/post" element={<StoryPostPage />} />
                <Route path="/story/view/:nanoid" element={<StoryViewPage />} />
                <Route path="/wish" element={<WishListPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/profile/edit/:email" element={<ProfileEditPage />} />
                <Route path="/myclass" element={<MyClassesPage />} />
                <Route path="/upload" element={<ClassUpload />} />
            </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </div>
  );
}

export default App;

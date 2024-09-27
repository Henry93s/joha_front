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
import LessonSearchPage from "./pages/LessonSearchPage";
import SearchPage from "./pages/SearchPage";
import StoryPage from "./pages/StoryPage";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import StoryViewPage from "./pages/StoryViewPage";
import StoryPostPage from "./pages/StoryPostPage";
import WishListPage from "./pages/WishListPage";

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <BrowserRouter>
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
            <Route path="/lesson_search" element={<LessonSearchPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/story" element={<StoryPage />} />
            <Route path="/story/view" element={<StoryViewPage />} />
            <Route path="/story/post" element={<StoryPostPage />} />
            <Route path="/wish" element={<WishListPage />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  );
}

export default App;

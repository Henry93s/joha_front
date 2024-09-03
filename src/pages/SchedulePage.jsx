import styled from "styled-components";
import React from 'react';
import Header from "../components/layout/Header";
import FooterMenu from "../components/layout/FooterMenu";
import CalendarComponent from '../components/Schedule/CalendarComponent';



const SchedulePage = () => {
  // 스케줄 페이지 렌더링
  return (
      <>
          <Header />
            <CalendarComponent />
          <FooterMenu />
      </>
  )
};

export default SchedulePage;
// 예약된 수업이 없을 때 나오는 UI
import React from "react";
import homeImg from "../../assets/images/home.png";
import * as No from "./NoClass.style"

const NoClass = () => {
  return (
    <No.Container>
      <No.Content>
        <No.NoReserveImg src={homeImg} />
        <No.Title>아직 등록된 나의 수업이 없습니다!</No.Title>
        <No.Description>
          나의 수업을 추가해주세요!!
        </No.Description>
        
      </No.Content>
      <No.ImageContainer />
    </No.Container>
  );
};

export default NoClass
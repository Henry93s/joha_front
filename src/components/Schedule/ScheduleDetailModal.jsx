import styled, { keyframes, css } from "styled-components";
import { useState } from "react";

// 리스트 항목 클릭 시 발생하는 슬라이더 항목 디테일 모달 컨테이너
const DetailSlideContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 50%;
  border-top: 3px solid #F0F0F2;
  background-color: white;
  // listSlideContainer 보다 z-index 를 높여서 위로 보이도록 함
  z-index: 4;

  /* 모달 내부에서만 스크롤 발생 */
  overflow-y: auto;
  // 스크롤은 동작 하나 스크롤바는 출력 하지 않도록 함
  // firefox
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera용 추가 */
  }

  // Tip: style 속성에 설정한 CSS(attrs) 는 인라인 스타일로 적용되며, 인라인 스타일에서는 CSS 트랜지션이 제대로 동작하지 않을 수 있음
  // => transform 를 스타일 템플릿 리터럴 내에서 동적으로 설정
  transform: ${({$isDetail}) => ($isDetail ? 'translateY(110%)' : 'translateY(200%)')};
  transition: all 1s ease;
`

const ModalCloseDiv = styled.div`
  // modal 상단 div 고정
  position: sticky;
  top: 0;
  background-color: white;
  display: flex;
  justify-content: end;
  height: 30px;
`
const CloseButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 30px;
  cursor: pointer;
  background-color: white;
  color: #BBBBBB;
`
// test 용
const ModalContent = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 95%;
  height: 50px;
  font-size: 15px;
  font-weight: 600;
  background-color: white;
  margin: 0 auto;
  cursor: pointer;
  padding: 0 10px;
  border-radius: 10px;

  transition: background-color 0.5s ease;

  &:hover{
    background-color: ${({$type}) => ($type === "error" ? '#ffe0e3' : '#e3e7ff')};
  }
`
const ModalContentTimeDiv = styled.div`
  display: flex;
  align-items: center;
  width: 55px;
`
// 일정 badge type 에 따른 구분 컴포넌트( error(공휴일 : red), my(작성한 일정(우선순위) : blue) )
const ScheduleLine = styled.div`
  width: 2px;
  height: 35px;
  border-right: ${({$type}) => ($type === "error" ? '2px solid #FE5054' : '2px solid #ADB4E0')};
`
const DetailSchedule = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
`
const DetailScheduleText = styled.p`
  font-size: 14px;
`
const DetailScheduleTime = styled.p`
  font-size: 12px;
  color: #BBBBBB;
`

const ScheduleDetailModal = ({detailData, isDetail, setIsDetail}) => {
    // 일정 Detail 컨텐츠 렌더링
    const DetailRender = () => {
        const item = detailData;
        return (
        <>
            <ModalContent $type={item.type} >
                <ModalContentTimeDiv>{item.timeStart}</ModalContentTimeDiv>
                <ScheduleLine $type={item.type} />
                <DetailSchedule>
                    <DetailScheduleText>{item.content}</DetailScheduleText>
                    <DetailScheduleTime>{item.time}</DetailScheduleTime>
                </DetailSchedule>
            </ModalContent>
        </>
        )
    }

    // Detail 모달 close
    const onClickCloseDetail = () => {
        setIsDetail(!isDetail);
    };

    return (
        <DetailSlideContainer $isDetail={isDetail}>
            <ModalCloseDiv>
                <CloseButton onClick={onClickCloseDetail}>X</CloseButton>
            </ModalCloseDiv>
            {DetailRender()}
        </DetailSlideContainer>
    )
}

export default ScheduleDetailModal;
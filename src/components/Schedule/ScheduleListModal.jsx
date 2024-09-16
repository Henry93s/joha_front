import styled, { keyframes, css } from "styled-components";
import { getScheduleListData } from "../../api/getScheduleListData";
import { useState } from "react";
import ScheduleDetailModal from "./ScheduleDetailModal";

// 모달을 덮는 Overlay 스타일
const ModalOverlay = styled.div`
  position: absolute;
  width: 100vw;
  max-width: 700px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.001);  /* 반투명한 회색 배경 */
  z-index: 2;
  /* 바깥 스크롤 방지 */
  overflow: hidden;
  // bottom footer(67px) + calendar padding-top(20px) 만큼 padding 부여
  padding-bottom: calc(67px + 20px);
  // Tip: style 속성에 설정한 CSS(attrs) 는 인라인 스타일로 적용되며, 인라인 스타일에서는 CSS 트랜지션이 제대로 동작하지 않을 수 있음
  // => transform 를 스타일 템플릿 리터럴 내에서 동적으로 설정
  transform: ${({$isVisible}) => ($isVisible ? 'translateY(0%)' : 'translateY(100%)')};
  transition: ${({$isVisible}) => ($isVisible ? 'all 0.5s ease' : 'all 1.5s ease')};
`;
// 일자 클릭 시 발생하는 슬라이더 모달 컨테이너
const ListSlideContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 50%;
  border-top: 3px solid #F0F0F2;
  background-color: white;
  z-index: 3;
  // bottom footer 높이 만큼 padding 부여해야 모든 일정 확인 가능함
  padding-bottom: 67px;

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
  transform: ${({$isVisible}) => ($isVisible ? 'translateY(110%)' : 'translateY(100%)')};
  transition: all 1s ease-in-out;
`
const ModalCloseDiv = styled.div`
  // modal 상단 div 고정
  position: sticky;
  top: 0;
  width: 100%;
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


// 함수 컴포넌트에서 props를 사용할 때는 객체로 전달되기 때문에, 매개변수를 구조 분해 할당 방식으로 받아야 함 !
const ScheduleListModal = ({selectedDate, isVisible, setIsVisible}) => {
    // 해당 날짜 일정 list 중 특정 스케쥴 선택 여부 상태 정의
    const [isDetail, setIsDetail] = useState(false);

    // 특정 일정 중 특정 detail 스케쥴 상태 정의
    const [detailData, setDetailData] = useState({
        type: 'null', // 공휴일 스타일을 'error'로 설정 => 빨간색
        color: 'null',
        content: 'null',
        timeStart: 'null',
        time: 'null'
    });

    // 일정 스케쥴 render
    const contentRender = (value) => {
        const listData = getScheduleListData(value);

        // 날짜 일정 list 중 특정 스케줄 선택 시
        const onClickDetailContent = (item) => {
            setIsDetail(!isDetail);
            // item 을 특정 detail 스케쥴 상태로 set
            setDetailData(item);
        };

        return (
            <>
                {listData.map((item, index) => (
                <ModalContent key={index} $type={item.type} $isDetail={isDetail} onClick={() => onClickDetailContent(item)}>
                    <ModalContentTimeDiv>{item.timeStart}</ModalContentTimeDiv>
                    <ScheduleLine $type={item.type} />
                    <DetailSchedule>
                        <DetailScheduleText>{item.content}</DetailScheduleText>
                        <DetailScheduleTime>{item.time}</DetailScheduleTime>
                    </DetailSchedule>
                </ModalContent>
                ))}
            </>
        )
    }

    // 모달 close
    const onClickCloseModal = () => {
        setIsVisible(!isVisible);
    }

    // x 버튼 및 모달 창 외 영역 클릭시 전체 모달 close
    const onClickModalOutside = (e) => {
        if(e.target.id === 'overlay'){
            setIsVisible(false);
            setIsDetail(false);
        }
    }

    return (
        <ModalOverlay id="overlay" $isVisible={isVisible} onClick={onClickModalOutside}>
            <ListSlideContainer $isVisible={isVisible}>
                <ModalCloseDiv>
                    <CloseButton onClick={onClickCloseModal}>X</CloseButton>
                </ModalCloseDiv>
                {contentRender(selectedDate)}   
            </ListSlideContainer>
            <ScheduleDetailModal detailData={detailData} isDetail={isDetail} setIsDetail={setIsDetail} />
        </ModalOverlay>
    )
}

export default ScheduleListModal;
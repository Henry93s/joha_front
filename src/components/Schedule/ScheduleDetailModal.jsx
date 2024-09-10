import styled, { keyframes, css } from "styled-components";
import { useState } from "react";

// 리스트 항목 클릭 시 발생하는 슬라이더 항목 디테일 모달 컨테이너
const DetailSlideContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    border-top: 3px solid #F0F0F2;
    background-color: white;
    // listSlideContainer 보다 z-index 를 높여서 위로 보이도록 함
    z-index: 4;
    // closeDiv(fixed) height 만큼 padding 부여
    padding-top: 50px;

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
    transform: ${({$isDetail}) => ($isDetail ? 'translateX(0%)' : 'translateX(100%)')};
    transition: all 0.65s ease;
`

const ModalCloseDiv = styled.div`
    // modal 상단 div 고정
    position: fixed;
    top: 0;
    width: 100%;
    background-color: white;
    display: flex;
    justify-content: start;
    height: 50px;
`
const CloseButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    font-size: 30px;
    cursor: pointer;
    background-color: white;
    color: #BBBBBB;

    @media (max-width: 1000px) {
        font-size: 27px;
    }
`
// 특정 날짜의 특정 스케줄 detailContainer
const DetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 95%;
    height: 100%;
    margin: 0 auto;
`
const DetailTitleDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 50px;
    font-size: 25px;
    font-weight: 600;

    @media (max-width: 1000px) {
        font-size: 22px;
    }
`
const DetailIconDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 15%;
    height: 100%;
`
const DetailIcon = styled.div`
    width: 20px;
    height: 20px;
    background-color: ${({$type}) => ($type === "error" ? '#FE5054' : '#ADB4E0')};
    border-radius: 20px;
`
const DetailTimeDiv = styled.div`
    display: flex;
    width: 95%;
    height: 100px;
    font-size: 28px;
    font-weight: bold;
    justify-content: center;
    align-items: center;

    @media (max-width: 1000px) {
        font-size: 25px;
    }
`
const DetailDivLine = styled.div`
    width: 100%;
    height: 2px;
    border-top: 2.5px solid #F0F0F2;
`


const ScheduleDetailModal = ({detailData, isDetail, setIsDetail}) => {
    // 일정 Detail 컨텐츠 렌더링
    const DetailRender = () => {
        const item = detailData;
        return (
        <>
            <DetailContainer>
                <DetailTitleDiv>
                    {item.content}
                    <DetailIconDiv>
                        <DetailIcon $type={item.type} />
                    </DetailIconDiv>
                </DetailTitleDiv>
                <DetailDivLine />
                <DetailTimeDiv>
                    {item.type === "error" &&
                        "지정 공휴일"
                    ||
                        item.time}
                </DetailTimeDiv>
                <DetailDivLine />
            </DetailContainer>
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
                <CloseButton onClick={onClickCloseDetail}>{"<"}</CloseButton>
            </ModalCloseDiv>
            {DetailRender()}
        </DetailSlideContainer>
    )
}

export default ScheduleDetailModal;
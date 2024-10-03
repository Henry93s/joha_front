import styled from "styled-components";
import Comment from "../item/Comment";

export const SwiperDiv = styled.div`
  position: relative;
  background: #eee;
  height: 110vw;
  max-height: 700px;
  & .swiper {
    height: 100%;
  }
`;

export const ImgDiv = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  & img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

export const Container = styled.div`
  padding: 0 15px 80px;
`;

export const Title = styled.h2`
  font-size: 20px;
  padding: 15px 30px 0 0;
  position: relative;
`;

export const StarDiv = styled.div`
  font-size: 16px;
  position: absolute;
  right: 32px;
  top: 16px;
  & svg {
    margin-top: 3px;
    margin-right: 1px;
  }
`;

export const ShareBtn = styled.button`
  position: absolute;
  right: 0;
  top: 16px;
  padding: 0;
  border: 0;
  background: none;
  & svg {
    vertical-align: top;
    width: 24px;
    height: 24px;
  }
`;

export const ShareModal = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 260px;
  border-radius: 5px;
  background: #fff;
  padding: 10px 15px;
  box-sizing: border-box;
  z-index: 12;
  & button {
    border: 0;
    background: none;
    padding: 5px;
  }
  & p {
    font-size: 20px;
    font-weight: bold;
    padding-bottom: 2px;
    border-bottom: 1px solid #333;
    margin: 10px 0 10px;
  }
  & div {
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
  }
  & div > button {
    padding: 0;
    background: #fff;
    border-radius: 50%;
    border: 1px solid #ddd;
  }
  & svg,
  & img {
    vertical-align: top;
    width: 40px;
    height: 40px;
  }
`;
export const ModalCloseBtn = styled.button`
  position: absolute;
  right: 10px;
  top: 10x;
  & svg {
    width: 20px;
    height: 20px;
  }
`;

export const ModalDim = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 11;
`;

export const InfoText = styled.p`
  font-size: 16px;
  padding: 20px 0 0;
  margin: 0;
`;

export const InfoDiv = styled.div`
  font-size: 16px;
  padding: 20px 0;
  border-top: 1px solid #ddd;

  & > p {
    font-size: 16px;
    margin: 0;
    padding-bottom: 15px;
    font-weight: bold;
  }

  & > div {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
  }
  & > button {
    background: none;
    border: none;
    font-size: 16px;
    margin-top: 15px;
    padding: 0;
    text-decoration: underline;
  }
`;

export const LocationDiv = styled.div`
  padding: 20px 0;
  border-top: 1px solid #ddd;
  & p {
    font-size: 16px;
    padding: 0 0 20px;
    margin: 0;
    font-weight: bold;
  }
`;

export const Location = styled.div`
  border-radius: 15px;
  overflow: hidden;
  background: #eee;
  height: 60vw;
  max-height: 400px;
`;

export const LocationText = styled.div`
  font-size: 16px;
  padding-top: 10px;
`;

export const ApplyBtnDiv = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 100;
  width: 100%;
  max-width: 700px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 15px;
  background: #fff;
  border-top: 1px solid #ddd;
  box-sizing: border-box;
  z-index: 1;
`;

export const ApplyBtn = styled.button`
  font-size: 16px;
  padding: 0 15px;
  background: #f87878;
  color: #fff;
  height: 50px;
  border: 0;
  border-radius: 15px;
`;

export const PriceDiv = styled.div`
  font-size: 16px;
  & p {
    font-size: 14px;
    margin: 0;
  }
`;
export const PriceText = styled.div`
  font-size: 14px;
  & strong {
    font-size: 18px;
  }

  & span {
    color: var(--main-color);
  }
`;

export const Loading_div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60vh;
  font-size: 18px;
`;
export const Loading_img = styled.img`
  /* 회전 애니메이션 */
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
export const ReviewDiv = styled.div`
  padding-top: 20px;
  border-top: 1px solid #ddd;
  & p {
    font-size: 16px;
    font-weight: bold;
  }
`;
export const ReviewBox = styled.div`
  max-height: 200px;
  overflow: hidden;
`;
export const Review = styled(Comment)`
  padding-bottom: 15px;
`;

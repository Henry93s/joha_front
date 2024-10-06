import styled from "styled-components";
import houseImg from "../../assets/images/house.jpg";

export const Container = styled.div`
  border: solid 1px #bebcbc;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  margin: 25px auto;
  display: flex;
  flex-direction: column;
  text-align: center;

  @media (min-width: 500px) {
    flex-direction: row;
    padding: 0;
  }
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 500px) {
    width: 50%;
    justify-content: center;
  }
`;
export const ImageContainer = styled.div`
  height: 0;
  opacity: 0;

  @media (min-width: 500px) {
    background-image: url(${houseImg});
    background-size: cover;
    background-position: center;
    border-radius: 0 10px 10px 0;
    width: 50%;
    height: 320px;
    opacity: 1;
  }
`;
export const NoReserveImg = styled.img`
  width: 50px;
  margin-bottom: 15px;
`;
export const Title = styled.span`
  margin-bottom: 12px;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  word-break: keep-all;

`;
export const Description = styled.span`
  margin-bottom: 12px;
  font-size: 14px;
  line-height: 17px;
  word-break: keep-all; //단어 단위 줄바꿈
`;
export const SearchButton = styled.button`
  margin-top: 10px;
  width: 90%;
  height: 50px;
  border: none;
  border-radius: 10px;
  background-color: #f87878;
  color: white;
  font-size: 16px;
  line-height: 20px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #fb9d9d;
  }
`;
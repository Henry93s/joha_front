import styled from "styled-components";

export const Container = styled.div`
  border: solid 1px #bebcbc;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  margin: 25px auto;
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
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

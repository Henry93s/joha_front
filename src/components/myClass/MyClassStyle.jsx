import styled, { css } from "styled-components";
import {Checkbox} from 'antd';

export const Container = styled.div`
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-bottom: 100px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0 25px 20px 0;
  width: 100%;
`;

export const Button = styled.div`
  width: 85px;
  height: 38px;
  padding: 10px 10px;
  margin-right: 5px;
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  color: white;
  border: none;
  background-color: #E61E51;
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 30px;
  transition: background-color 1s;

  &:hover{
    background-color:#F0586F;
  }
`;

export const ListItem = styled.div`
  background-color: white;
  border-radius: 15px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Image = styled.div`
  background-color: #f1f1f1;
  width: 100%;
  height: 160px;
  border-radius: 15px;
  background-image: url(${(props) => props.$imageUrl});
  background-size: cover;
  background-position: center;
  position: relative;
`;

export const CheckboxGroup = styled(Checkbox.Group)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between; 
  & > a {display: block; width: calc(50% - 10px)}
  gap: 10px;
  width: 100%;
`
// antd 체크박스 css style 정의
export const CheckboxOption = styled(Checkbox)`
    position: absolute;
    right: 10px;
    top: 10px;
    // 체크'박스' css 
    // 체크박스 크기
    .ant-checkbox-input {
        width: 27px;  
        height: 27px; 
    }
    .ant-checkbox-inner {
        width: 27px;  
        height: 27px; 
        border-radius: 4px; 
    }
    .ant-checkbox-inner:after {
        width: 7px; 
        height: 15px;
    }
    // 체크'박스' css 
    // input 체크 후 hover 시에도 배경, 테두리 유지
    // css 레벨에서 우선순위를 최상위로 높임 : !important
    .ant-checkbox-input:checked + .ant-checkbox-inner {
        background-color: #E61E51 !important;
        border: 1px solid #F0586F !important;
    }
`
export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0 15px 0;
  cursor: pointer;
`;

export const Title = styled.span`
  font-size: 12px;
  color: #333333;
`;

export const Description = styled.span`
  font-size: 12px;
  color: #555555;
`;

export const Price = styled.span`
  font-size: 12px;
  font-weight: bold;
  color: #000000;
`;

export const Loading_div = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 40%;
`
export const Loading_img = styled.img`
    /* 회전 애니메이션 */
    @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
    }
`

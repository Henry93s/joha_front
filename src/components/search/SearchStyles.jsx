import styled from "styled-components";
import Select from "react-select";
import { Link } from "react-router-dom";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg"; // SVG 파일을 컴포넌트로 import

import { ReactComponent as StarIcon } from "../../assets/icons/star.svg"; // SVG 파일을 컴포넌트로 import
import { ReactComponent as HeartFillIcon } from "../../assets/icons/heart-fill.svg"; // SVG 파일을 컴포넌트로 import
import { ReactComponent as Close } from "../../assets/icons/close.svg"; // SVG 파일을 컴포넌트로 import

// 공통
export const Container = styled.div`
  padding: 15px 15px;
  background: #fff;
`;

// LessonSearch.jsx style
export const MapCont = styled.div`
  height: 47vw;
  max-height: 350px;
  overflow: hidden;
  background: #ddd;
  position: relative;
  z-index: 10;
`;
export const LessonSearchCon = styled(Container)`
  border-radius: 15px 15px 0 0;
  background: #fff;
  position: relative;
  z-index: 11;
  margin-top: -20px;
`;
export const Inputbox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const SearchSelect = styled(Select)`
  border-radius: 10px;
  background: #f1f1f1;
  border: none !important;
  width: calc(100% - 40px);
`;
export const SearchSelectStyles = {
  indicatorSeparator: (provided, state) => ({
    ...provided,
    display: "none", // 화살표 옆의 구분선 제거
  }),
  control: (provided, state) => ({
    ...provided,
    height: "50px", // 원하는 높이
    backgroundColor: "#f1f1f1", // 배경색 변경
    border: 0,
    "border-radius": "15px",
    borderColor: state.isFocused ? "none" : "none", // 포커스 시 테두리 색상 변경
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#f1f1f1", // 드롭다운 배경색 변경
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#b3d4fc" : "#f0f0f0", // 선택된 옵션과 비선택 옵션 배경색
    color: state.isSelected ? "#000" : "#333",
    "&:hover": {
      backgroundColor: "#e0e0e0", // 옵션 위에 마우스를 올렸을 때 배경색
    },
  }),
  valueContainer: (provided) => ({
    ...provided,
    height: "50px", // valueContainer의 높이도 control과 동일하게 설정
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: "50px", // indicator (드롭다운 화살표 등)의 높이 설정
  }),
};

export const StyledSearchIcon = styled(SearchIcon)`
  width: 24px;
  height: 24px;
  margin-left: 15px;
  & path {
    fill: var(--main-color);
  }
`;

export const ItemCont = styled.ul`
  padding-top: 18px;
  .item {
    display: flex;
    justify-content: space-between;
    gap: 15px;
    border-bottom: 1px solid #e6e6e6;
    padding: 15px 0;
  }

  .item h5 {
    font-size: 16px;
  }

  .item .right_box {
    text-align: right;
  }
`;
export const NoItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 47vw;
`;

// ListItem.jsx style
export const Item = styled(Link)`
  display: flex;
  justify-content: space-between;
  gap: 15px;
  border-bottom: 1px solid #e6e6e6;
  padding: 15px 0;
`;

export const Title = styled.p`
  font-size: 16px;
  font-weight: bold;
`;
export const LeftBox = styled.div`
  width: 100%;
`;
export const Price = styled.strong`
  font-size: 16px;
  font-weight: bold;
  color: var(--main-color);
  display: flex;
`;
export const InfoIconBox = styled.div`
  display: flex;
  align-items: center;
  & div {
    margin-right: 4px;
  }
  & svg {
    vertical-align: 0px;
  }
  font-size: 12px;
  color: #999;
`;
export const StyledHeartIcon = styled(HeartFillIcon)`
  width: 12px;
  height: 12px;
  & path {
    fill: #999;
  }
`;
export const StyledStarIcon = styled(StarIcon)`
  width: 12px;
  height: 12px;
  & path {
    fill: #999;
  }
`;
export const InfoText = styled.div`
  font-size: 14px;
  color: #999;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  padding-top: 5px;
`;

export const RightBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: end;
`;

export const ItemImageBox = styled.div`
  background: #ddd;
  ${(props) =>
    props.bg
      ? `background-image: url(${props.bg}); 
      background-repeat: no-repeat;
      background-position: 50% 50%;
      background-size: cover;
      `
      : null};
  border-radius: 10px;
  overflow: hidden;
  height: 65px;
  width: 65px;
  margin-top: 20px;
`;

// Search.jsx style
export const SearchCont = styled.div`
  display: flex;
  align-items: center;
`;
export const SearchButton = styled.button`
  width: 50px;
  background: none;
`;

export const CustomStyles = {
  dropdownIndicator: (provided) => ({
    ...provided,
    display: "none", // 화살표 제거
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: "none", // 화살표 옆의 구분선 제거
  }),
  control: (provided) => ({
    ...provided,
    backgroundColor: "#f1f1f1", // 배경색 변경
    border: 0,
    "border-radius": "15px",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#f1f1f1", // 드롭다운 배경색 변경
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#b3d4fc" : "#f0f0f0", // 선택된 옵션과 비선택 옵션 배경색
    color: state.isSelected ? "#000" : "#333",
    "&:hover": {
      backgroundColor: "#e0e0e0", // 옵션 위에 마우스를 올렸을 때 배경색
    },
  }),
};

export const SearchTitle = styled.h2`
  font-size: 20px;
  padding-top: 40px;
`;
export const RecentArea = styled.ul`
  padding-top: 10px;
  & li a {
    display: flex;
    align-items: center;
    padding-bottom: 2px;
    font-size: 16px;
    color: #999;
  }
`;
export const StyledClose = styled(Close)`
  width: 16px;
  height: 16px;
  & path {
    stroke: #999;
  }
  margin-left: 5px;
`;

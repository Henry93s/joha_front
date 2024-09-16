import styled from "styled-components";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import Select from "react-select";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg"; // SVG 파일을 컴포넌트로 import

import ListItem from "./ListItem";
import KakaoMap from "./KakaoMap";
import FilterComponent from "../item/Filter";
const MapCont = styled.div`
  height: 47vw;
  max-height: 350px;
  overflow: hidden;
  background: #ddd;
  position: relative;
  z-index: 10;
`;
const Container = styled.div`
  padding: 15px 15px;
  border-radius: 15px 15px 0 0;
  background: #fff;
  position: relative;
  z-index: 11;
  margin-top: -20px;
`;
const Inputbox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const SearchSelect = styled(Select)`
  border-radius: 10px;
  background: #f1f1f1;
  border: none !important;
  width: calc(100% - 40px);
`;
const SearchSelectStyles = {
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

const StyledSearchIcon = styled(SearchIcon)`
  width: 24px;
  height: 24px;
  margin-left: 15px;
  & path {
    fill: var(--main-color);
  }
`;

const ItemCont = styled.ul`
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

const LessonSearch = () => {
  const [address, setAddress] = useState(""); // 유저 주소 상태 저장
  const SearchSelectEl = useRef();
  const [searchParams, setSearchParams] = useSearchParams();
  const [places, setPlaces] = useState([]); // 사용자 주소 근처의 장소만 불러오기
  const [searchSelect, setSearchSelect] = useState("");
  const SearchOptions = [
    { value: "헬스", label: "헬스" },
    { value: "필라테스", label: "필라테스" },
    { value: "수영", label: "수영" },
    { value: "피아노", label: "피아노" },
    { value: "영어", label: "영어" },
    { value: "헬스", label: "헬스" },
    { value: "필라테스", label: "필라테스" },
    { value: "수영", label: "수영" },
    { value: "피아노", label: "피아노" },
    { value: "영어", label: "영어" },
  ];

  const dataArr = [
    {
      title: "원데이 뜨개질 클래스",
      price: 30000,
      star: 4.6,
      heart: 12,
      content:
        "하루만에 뜨개질 배우기하루만에 뜨개질 배우기하루만에 뜨개질 배우기하루만에 뜨개질 배우기",
      view: 320,
      img: "",
      rocket: true,
    },
    {
      title: "피아노 한곡 배우기",
      price: 15000,
      star: 4.2,
      heart: 22,
      content: "좋아하는 피아노 곡 하나 정해서 마스터 하기!",
      view: 500,
      img: "",
      rocket: false,
    },
    {
      title: "원데이 요가",
      price: 20000,
      heart: 3,
      star: 4.0,
      content: "하루 1시간 반 요가 배우기",
      view: 88,
      img: "",
      rocket: false,
    },
    {
      title: "1:1 수영 강의",
      price: 10000,
      heart: 7,
      star: 4.5,
      content: "자유형, 접영, 배영 등 1:1로 강의해드립니다.",
      view: 110,
      img: "",
      rocket: false,
    },
  ];

  useEffect(() => {
    // axios 요청으로 사용자 위치 가져오기
    setAddress("서울 성동구 아차산로17길 48");

    // 쿼리 값 가져와 searchSelect 상태에 저장
    setSearchSelect(searchParams.get("keyword"));
  }, [searchSelect]);

  // 가게 정보를 서버에서 가져오기(이름, 가격, 찜 개수, 별점, 이미지, 소개글, 찜하기 여부)
  useEffect(() => {
    async function fetchPlaces() {
      try {
        const response = await axios("/api/places"); // 백엔드의 가게 정보 요청 API
        setPlaces(response.data); // 가져온 가게 정보를 상태로 저장
      } catch (error) {
        console.error("Failed to fetch places:", error);
      }
    }

    fetchPlaces();
  }, []);

  return (
    <div>
      <MapCont>
        {/* 키워드 넘겨줄 때 지역 + 키워드로 넘겨야 장소 + 키워드가 검색됨 */}
        {places && <KakaoMap places={places} />}
      </MapCont>
      <Container>
        <Inputbox>
          <SearchSelect
            options={SearchOptions}
            styles={SearchSelectStyles}
            placeholder=""
            ref={SearchSelectEl}
          />
          <StyledSearchIcon
            onClick={() => {
              setSearchSelect(SearchSelectEl.current.props.value.value);
            }}
          />
        </Inputbox>
        <FilterComponent />

        <div id="menu_wrap">
          <ItemCont id="placesList">
            {places.map((el, key) => {
              return (
                <ListItem
                  key={`ListItem${key}`}
                  title={el.title}
                  price={el.price}
                  star={el.star}
                  heart={el.heart}
                  content={el.content}
                  view={el.view}
                  rocket={el.rocket}
                  img={el.img}
                />
              );
            })}
          </ItemCont>
          <div id="pagination"></div>
        </div>
      </Container>
    </div>
  );
};

export default LessonSearch;

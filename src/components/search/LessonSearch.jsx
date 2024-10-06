import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import ListItem from "./ListItem";
import KakaoMap from "./KakaoMap";
import FilterComponent from "../item/Filter";
import { fetchClass } from "../../api/class";
import {
  MapCont,
  LessonSearchCon,
  Inputbox,
  SearchSelect,
  StyledSearchIcon,
  ItemCont,
  SearchSelectStyles,
} from "./SearchStyles";

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

  // 수업 정보를 서버에서 가져오기
  useEffect(() => {
    fetchClass();
  }, []);

  return (
    <div>
      <MapCont>
        {/* 키워드 넘겨줄 때 지역 + 키워드로 넘겨야 장소 + 키워드가 검색됨 */}
        {places && <KakaoMap places={places} />}
      </MapCont>
      <LessonSearchCon>
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
      </LessonSearchCon>
    </div>
  );
};

export default LessonSearch;

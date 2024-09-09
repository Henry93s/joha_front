import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import Select from "react-select";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg"; // SVG 파일을 컴포넌트로 import
import { ReactComponent as FilterIcon } from "../../assets/icons/filter.svg"; // SVG 파일을 컴포넌트로 import
import ListItem from "./ListItem";
import KakaoMap from "./KakaoMap";
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
const FilterSelectStyles = {
  ...SearchSelectStyles,
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "#f1f1f1", // 배경색 변경
    border: 0,
    "border-radius": "15px",
    width: "100%", // 원하는 너비
    height: "34px",
  }),
  valueContainer: (provided) => ({
    ...provided,
    height: "34px", // valueContainer의 높이도 control과 동일하게 설정
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: "34px", // indicator (드롭다운 화살표 등)의 높이 설정
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

const FilterBox = styled.div`
  padding-top: 10px;
`;
const FilterBtn = styled.button`
  background: none;
  border: 0;
  font-size: 12px;
  &.on {
    color: var(--main-color);
  }
`;
const StyledFilter = styled(FilterIcon)`
  margin-right: 3px;
  width: 19px;
  height: 19px;
  &.on {
    color: var(--main-color);
  }
  &.on path {
    stroke: var(--main-color);
  }
`;
const FilterCont = styled.div`
  & dl {
    display: flex;
    padding-top: 7px;
  }
  & dt {
    font-weight: bold;
    width: 70px;
    padding-top: 7px;
  }
  & dd {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    input {
      height: auto;
      border-radius: 4px;
      background: #f1f1f1;
      border: 0;
      padding: 0 10px;
    }
    input[type="number"] {
      text-align: right;
    }
    & > input {
      width: calc(50% - 15px);
      height: 34px;
    }
    font-size: 12px;
  }
`;
const FilterSelect = styled(SearchSelect)`
  width: 100%;
  border-radius: 5px;
  font-size: 12px;
`;
const ButtonDiv = styled.div`
  text-align: right;
  padding-top: 10px;
  & button {
    border-radius: 5px;
    height: 30px;
    width: 56px;
    font-size: 12px;
    margin-left: 5px;
  }
`;
const InitBtn = styled.button`
  background: #f1f1f1;
`;
const SubmitBtn = styled.button`
  background: var(--main-color);
  color: #fff;
`;

const ItemCont = styled.ul`
  padding-top: 18px;
`;

const LessonSearch = () => {
  const [filterCheck, setFilterCheck] = useState(false); // 필터 클릭 상태 저장
  const [searchSelect, setSearchSelect] = useState("");
  const [filterOption, setFilterOption] = useState({
    minAmount: "",
    maxAmount: "",
    data: "",
    time: "",
  });
  const [address, setAddress] = useState(""); // 유저 주소 상태 저장
  const [filteredData, setFilterData] = useState([]);
  const SearchSelectEl = useRef();
  const [searchParams, setSearchParams] = useSearchParams();

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

  const FilterOptions1 = [
    { value: "one", label: "일회성" },
    { value: "subscribe", label: "주기성" },
    { value: "all", label: "모두" },
  ];
  const FilterOptions2 = [
    { value: "morning", label: "오전 (06:00 ~ 11:59)" },
    { value: "afternoon", label: "오후 (12:00 ~ 17:59)" },
    { value: "evening", label: "저녁 (18:00 ~ 23:59)" },
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
      rocket: true,
    },
    {
      title: "피아노 한곡 배우기",
      price: 15000,
      star: 4.2,
      heart: 22,
      content: "좋아하는 피아노 곡 하나 정해서 마스터 하기!",
      view: 500,
      rocket: false,
    },
    {
      title: "원데이 요가",
      price: 20000,
      heart: 3,
      star: 4.0,
      content: "하루 1시간 반 요가 배우기",
      view: 88,
      rocket: false,
    },
    {
      title: "1:1 수영 강의",
      price: 10000,
      heart: 7,
      star: 4.5,
      content: "자유형, 접영, 배영 등 1:1로 강의해드립니다.",
      view: 110,
      rocket: false,
    },
  ];

  // 필터 인풋 상태 저장
  const handleInputChange = (e) => {
    const [value, name] = e.target;
    setFilterOption((prev) => {
      return { ...prev, [name]: value };
    });
    console.log(filterOption);
  };
  const handleSelectChange = (selectedOption, { name }) => {
    // react-select에서 onChange이벤트에 등록한 함수에 두번째 인자로
    const firstName = name || "default";
    setFilterOption((prev) => ({
      ...prev,
      [firstName]: selectedOption ? selectedOption.value : "",
    }));
    console.log(filterOption);
  };

  // 필터 적용
  const filterOnHandler = () => {
    setFilterOption((prev) => {
      return [...prev];
    });
  };

  useEffect(() => {
    // axios 요청으로 사용자 위치 가져오기
    setAddress("서울 성동구 아차산로17길 48");

    // 쿼리 값 가져와 searchSelect 상태에 저장
    setSearchSelect(searchParams.get("keyword"));
    console.log(searchSelect);
  }, [searchSelect]);

  return (
    <div>
      <MapCont>
        <KakaoMap address={address} keyword={searchSelect} />
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
        <FilterBox>
          <FilterBtn
            type="button"
            onClick={() => setFilterCheck((prev) => !prev)}
            className={filterCheck ? "on" : ""}
          >
            <StyledFilter className={filterCheck ? "on" : ""} />
            필터
          </FilterBtn>
        </FilterBox>
        {filterCheck && (
          <FilterCont>
            <dl>
              <dt>가격</dt>
              <dd>
                {/* onWheel={event => (event.target).blur()} 휠 이벤트 시 숫자 변경되는 문제 해결 */}
                <input
                  type="number"
                  name="minPrice"
                  onWheel={(event) => event.target.blur()}
                  onChange={(e) => handleInputChange(e)}
                />
                ~{" "}
                <input
                  type="number"
                  name="maxPrice"
                  onWheel={(event) => event.target.blur()}
                  onChange={(e) => handleInputChange(e)}
                />
              </dd>
            </dl>
            <dl>
              <dt>날짜</dt>
              <dd>
                <FilterSelect
                  options={FilterOptions1}
                  styles={FilterSelectStyles}
                  placeholder="일회성 / 주기성 / 모두 가능"
                  name="date"
                  onChange={(e) => handleSelectChange(e)}
                />
              </dd>
            </dl>
            <dl>
              <dt>시간</dt>
              <dd>
                <FilterSelect
                  options={FilterOptions2}
                  styles={FilterSelectStyles}
                  placeholder="오전/오후/저녁"
                  name="time"
                  onChange={(e) => handleSelectChange(e)}
                />
              </dd>
            </dl>
            <ButtonDiv>
              <InitBtn type="button">초기화</InitBtn>
              <SubmitBtn type="button" onClick={filterOnHandler}>
                적용
              </SubmitBtn>
            </ButtonDiv>
          </FilterCont>
        )}

        <ItemCont>
          {dataArr.map((el, key) => {
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
              />
            );
          })}
        </ItemCont>
      </Container>
    </div>
  );
};

export default LessonSearch;

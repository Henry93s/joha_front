import styled from "styled-components";
import { useState } from "react";
import Select from "react-select";
import { ReactComponent as FilterIcon } from "../../assets/icons/filter.svg"; // SVG 파일을 컴포넌트로 import
import { ReactComponent as DeleteIcon } from "../../assets/icons/close.svg"; // SVG 파일을 컴포넌트로 import
import CalendarComponent from "./Calendar";

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
  margin-right: 5px;
`;
const FilterItem = styled.div`
  display: inline-flex;
  font-size: 12px;
  background: #def4f4;
  border-radius: 5px;
  padding: 3px 6px;
  margin: 0 3px;
  align-items: center;
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
  padding-top: 3px;
  & dl {
    display: flex;
    flex-wrap: wrap;
    padding-top: 7px;
  }
  & dt {
    font-weight: bold;
    width: 70px;
  }
  & dd {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 7px;
    input[type="text"] {
      height: auto;
      border-radius: 4px;
      background: #f1f1f1;
      border: 0;
      padding: 0 10px;
      width: 100%;
    }
    input[type="number"] {
      border-radius: 4px;
      background: #f1f1f1;
      border: 0;
      padding: 0 10px;
      text-align: right;
    }
    & > input {
      width: calc(50% - 15px);
      height: 34px;
    }
    font-size: 12px;
  }
`;
const CheckboxDiv = styled.dd`
  display: flex;
  justify-content: space-between;
  & label {
    display: block;
    text-align: center;
  }
`;

const FilterSelect = styled(Select)`
  background: #f1f1f1;
  border: none !important;
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
const SearchSelectStyles = {
  indicatorSeparator: (provided, state) => ({
    ...provided,
    display: "none", // tuesday살표 옆의 구분선 제거
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
    height: "50px", // indicator (드롭다운 tuesday살표 등)의 높이 설정
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
    height: "34px", // indicator (드롭다운 tuesday살표 등)의 높이 설정
  }),
};

const FilterComponent = () => {
  const [filterCheck, setFilterCheck] = useState(false); // 필터 클릭 상태 저장
  const [filterOption, setFilterOption] = useState({
    minPrice: "",
    maxPrice: "",
    data: "",
    time: "",
  });
  const [applyFilter, setApplyFilter] = useState([]);

  // 요일 체크박스
  const [checkedDay, setCheckedDay] = useState({
    everyday: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });

  const FilterOptions1 = [
    { value: "once", label: "일회성" },
    { value: "regularity", label: "주기성" },
    { value: "all", label: "모두" },
  ];
  const FilterOptions2 = [
    { value: "morning", label: "오전 (06:00 ~ 11:59)" },
    { value: "afternoon", label: "오후 (12:00 ~ 17:59)" },
    { value: "evening", label: "저녁 (18:00 ~ 23:59)" },
  ];
  const [isOnce, setIsOnce] = useState(false); // 필터 일회성 선택 시 datepicker노출
  const [isRegular, setIsRegular] = useState(false); // 요일 체크박스 노출
  const [selectedDate, setSelectedDate] = useState(""); // 선택 날짜 저장

  // 가격 상태 저장
  const handleInputChange = (e) => {
    const { value, name } = e.target;

    setFilterOption((prev) => {
      return { ...prev, [name]: value };
    });
  };

  // select 날짜 상태 저장
  const handleDateChange = (selectedOption) => {
    setFilterOption((prev) => ({
      ...prev,
      date: selectedOption.label,
    }));
    selectedOption.value === "once" ? setIsOnce(true) : setIsOnce(false);
    selectedOption.value === "regularity"
      ? setIsRegular(true)
      : setIsRegular(false);
  };

  // 시간 상태 저장
  const handleTimeChange = (selectedOption) => {
    setFilterOption((prev) => ({
      ...prev,
      time: selectedOption.label,
    }));
  };

  // 날짜 체크박스 이벤트
  const CheckChangeHandler = (e) => {
    const { id, checked } = e.target;
    if (id === "everyday" && checked) {
      setCheckedDay({
        everyday: true,
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true,
      });
    } else {
      if (id === "everyday") {
        setCheckedDay({
          everyday: false,
          monday: false,
          tuesday: false,
          wednesday: false,
          thursday: false,
          friday: false,
          saturday: false,
          sunday: false,
        });
      } else {
        setCheckedDay((prev) => ({ ...prev, [id]: checked, everyday: false }));
      }
    }
  };

  // 필터 적용
  const filterOnHandler = () => {
    // 필터 validate
    // 요일 체크박스 체크 확인
    const isChecked = Object.values(checkedDay).some((day) => day); // 체크가 하나라도 있다면 true
    if (isRegular && !isChecked) {
      alert("요일을 체크해 주세요.");
      return false;
    }
    // 날짜 선택 확인
    if (isOnce && !selectedDate) {
      alert("날짜를 선택해 주세요.");
      return false;
    }

    if (filterOption.minPrice > filterOption.maxPrice) {
      alert("값을 정확히 입력해 주세요.");
      return false;
    }

    // 필터에 맞는 place 데이터 뿌리기

    // 체크한 날짜 텍스트 구하기
    const checkedDayArr = Object.entries(checkedDay) // 객체를 배열로 변환 [key, value] 형태
      .filter(([key, value]) => value) // value가 true인 항목만 필터링
      .map(([key]) => key);
    const labels = checkedDayArr.map((id) => {
      const label = document.querySelector(`label[for="${id}"]`); // 라벨 요소 찾기
      return label ? label.textContent : null;
    });
    const checkedDayLabel = labels.filter((label) => label); // null 값 제거

    // 필터 내용 보여주기
    const filterArr = [];
    if (filterOption.minPrice && filterOption.maxPrice) {
      filterArr.push({
        type: "가격",
        value: `${filterOption.minPrice}원 ~ ${filterOption.maxPrice}원`,
      });
    }
    if (filterOption.date) {
      let value = "";
      if (isRegular) {
        value = checkedDayLabel.join(" ");
      } else if (isOnce) {
        value = selectedDate;
      } else {
        value = filterOption.date;
      }
      filterArr.push({ type: "날짜", value: value });
    }

    if (filterOption.time)
      filterArr.push({ type: "시간", value: filterOption.time });
    setApplyFilter(filterArr);
    console.log(filterArr);

    // 필터 닫기
    setFilterCheck(false);
  };

  // 필터 요소 삭제
  const filterDeleteHandler = (index) => {
    // 삭제 요소 제외한 필터링 데이터 노출

    setFilterOption({
      minPrice: "",
      maxPrice: "",
      data: "",
      time: "",
    });
    setIsOnce(false);
    setIsRegular(false);

    // 클릭 요소 삭제
    const filterArr = applyFilter.filter((el, idx) => idx !== index);
    return setApplyFilter(filterArr);
  };

  // 필터 초기화
  const filterResetHandler = () => {
    setFilterOption({
      minPrice: "",
      maxPrice: "",
      data: "",
      time: "",
    });
    setApplyFilter([]);
    setIsOnce(false);
    setIsRegular(false);
  };

  return (
    <>
      <FilterBox>
        <FilterBtn
          type="button"
          onClick={() => setFilterCheck((prev) => !prev)}
          className={filterCheck ? "on" : ""}
        >
          <StyledFilter className={filterCheck ? "on" : ""} />
          필터
        </FilterBtn>
        {applyFilter.length > 0 &&
          applyFilter
            .filter((filter) => filter)
            .map((filter, index) => {
              return (
                <FilterItem key={`filter${index}`}>
                  {filter.type} : {filter.value}
                  <DeleteIcon
                    style={{ width: "16px", height: "16px" }}
                    onClick={() => filterDeleteHandler(index)}
                  />
                </FilterItem>
              );
            })}
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
                value={filterOption.minPrice}
              />
              ~{" "}
              <input
                type="number"
                name="maxPrice"
                onWheel={(event) => event.target.blur()}
                onChange={(e) => handleInputChange(e)}
                value={filterOption.maxPrice}
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
                value={FilterOptions1.find(
                  (option) => option.value === filterOption.date
                )}
                onChange={(e) => handleDateChange(e)}
              />
            </dd>
            {isOnce && (
              <dd>
                <CalendarComponent setSelectedDate={setSelectedDate} />
              </dd>
            )}
            {isRegular && (
              <CheckboxDiv>
                <div>
                  <label htmlFor="everyday">매일</label>
                  <input
                    type="checkbox"
                    name="day"
                    id="everyday"
                    checked={checkedDay.everyday}
                    onChange={CheckChangeHandler}
                  />
                </div>
                <div>
                  <label htmlFor="monday">월</label>
                  <input
                    type="checkbox"
                    name="day"
                    id="monday"
                    checked={checkedDay.monday}
                    onChange={CheckChangeHandler}
                  />
                </div>
                <div>
                  <label htmlFor="tuesday">화</label>
                  <input
                    type="checkbox"
                    name="day"
                    id="tuesday"
                    checked={checkedDay.tuesday}
                    onChange={CheckChangeHandler}
                  />
                </div>
                <div>
                  <label htmlFor="wednesday">수</label>
                  <input
                    type="checkbox"
                    name="day"
                    id="wednesday"
                    checked={checkedDay.wednesday}
                    onChange={CheckChangeHandler}
                  />
                </div>
                <div>
                  <label htmlFor="thursday">목</label>
                  <input
                    type="checkbox"
                    name="day"
                    id="thursday"
                    checked={checkedDay.thursday}
                    onChange={CheckChangeHandler}
                  />
                </div>
                <div>
                  <label htmlFor="friday">금</label>
                  <input
                    type="checkbox"
                    name="day"
                    id="friday"
                    checked={checkedDay.friday}
                    onChange={CheckChangeHandler}
                  />
                </div>
                <div>
                  <label htmlFor="saturday">토</label>
                  <input
                    type="checkbox"
                    name="day"
                    id="saturday"
                    checked={checkedDay.saturday}
                    onChange={CheckChangeHandler}
                  />
                </div>
                <div>
                  <label htmlFor="sunday">일</label>
                  <input
                    type="checkbox"
                    name="day"
                    id="sunday"
                    checked={checkedDay.sunday}
                    onChange={CheckChangeHandler}
                  />
                </div>
              </CheckboxDiv>
            )}
          </dl>
          <dl>
            <dt>시간</dt>
            <dd>
              <FilterSelect
                options={FilterOptions2}
                styles={FilterSelectStyles}
                placeholder="오전/오후/저녁"
                name="time"
                value={FilterOptions2.find(
                  (option) => option.value === filterOption.time
                )}
                onChange={(e) => handleTimeChange(e)}
              />
            </dd>
          </dl>
          <ButtonDiv>
            <InitBtn type="button" onClick={filterResetHandler}>
              초기화
            </InitBtn>
            <SubmitBtn type="button" onClick={filterOnHandler}>
              적용
            </SubmitBtn>
          </ButtonDiv>
        </FilterCont>
      )}
    </>
  );
};

export default FilterComponent;

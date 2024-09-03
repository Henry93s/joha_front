import { useState, useEffect } from "react";
import styled from "styled-components";
import Select from "react-select";
import { Link } from "react-router-dom";
import { ReactComponent as Close } from "../../assets/icons/close.svg"; // SVG 파일을 컴포넌트로 import
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg"; // SVG 파일을 컴포넌트로 import

const Container = styled.div`
  padding: 0 15px;
`;
const SearchCont = styled.div`
  display: flex;
  align-items: center;
`;
const SearchButton = styled.button`
  width: 50px;
  background: none;
`;
const SearchSelect = styled(Select)`
  border-radius: 10px;
  background: #f1f1f1;
  border: none !important;
  & input {
    height: 38px;
  }
  width: calc(100% - 50px);
`;
const customStyles = {
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

const Title = styled.h2`
  font-size: 20px;
  padding-top: 40px;
`;
const RecentArea = styled.ul`
  padding-top: 10px;
  & li a {
    display: flex;
    align-items: center;
    padding-bottom: 2px;
    font-size: 16px;
    color: #999;
  }
`;
const StyledClose = styled(Close)`
  width: 16px;
  height: 16px;
  & path {
    stroke: #999;
  }
  margin-left: 5px;
`;

const Search = () => {
  const options = [
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

  const [selectedOption, setSelectedOption] = useState("");

  const [searchArray, setSearchArray] = useState([]);

  useEffect(() => {
    // 로컬스토리지에 저장된 최근 검색어 가져오기
    const searchList = localStorage.getItem("recentSearch");

    // 로컬스토리지에 최근 검색어 있을 경우 상태에 반영
    if (searchList) {
      setSearchArray(JSON.parse(searchList));
    }
  }, []);

  const handleChange = (option) => {
    setSelectedOption(option);
  };

  // 검색했을 때 로컬스토리지에 검색어, 주소 저장
  const onSearchFormSubmit = (e) => {
    e.preventDefault();

    // 검색어가 없을 때
    if (!selectedOption) {
      alert("검색어를 입력해주세요.");
      e.preventDefault();
      return false;
    }

    setSearchArray((arr) => {
      let newArr = [];
      newArr = arr.filter((word) => {
        if (word !== selectedOption.value) {
          return word;
        }
      });
      // 중복 검색어를 앞에 노출되게 작업
      newArr.unshift(selectedOption.value);

      const setArray = new Set(newArr);
      return [...setArray];
    });
    localStorage.setItem("recentSearch", JSON.stringify(searchArray));
    console.log(searchArray);
    console.log(localStorage.getItem("recentSearch"));
  };

  const handleDelete = (e, word) => {
    e.preventDefault();
    const filteredArray = searchArray.filter((item) => item !== word);
    setSearchArray(filteredArray);
    localStorage.setItem("recentSearch", JSON.stringify(filteredArray));
  };
  //localStorage.removeItem("recentSearch");

  return (
    <Container>
      <SearchCont>
        <SearchSelect
          options={options}
          styles={customStyles}
          placeholder=""
          onChange={handleChange}
        />
        <SearchButton onClick={(e) => onSearchFormSubmit(e)} type="button">
          <SearchIcon />
        </SearchButton>
      </SearchCont>

      {searchArray.length > 0 && (
        <>
          <Title>최근 검색어</Title>
          <RecentArea>
            {searchArray.map((word, idx) => {
              return (
                <li key={`keyword${idx}`}>
                  <Link to={word}>
                    {word}{" "}
                    <StyledClose onClick={(e) => handleDelete(e, word)} />
                  </Link>
                </li>
              );
            })}
          </RecentArea>
        </>
      )}
    </Container>
  );
};

export default Search;

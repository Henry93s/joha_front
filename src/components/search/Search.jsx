import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg"; // SVG 파일을 컴포넌트로 import
import {
  Container,
  SearchCont,
  SearchButton,
  CustomStyles,
  SearchTitle,
  RecentArea,
  StyledClose,
  SearchSelect,
} from "./SearchStyles";

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
  const navigate = useNavigate();

  useEffect(() => {
    // 로컬스토리지에 저장된 최근 검색어 가져오기
    const searchList = getExpireItem("recentSearch");

    // 로컬스토리지에 최근 검색어 있을 경우 상태에 반영
    console.log(searchList);
    if (searchList) {
      setSearchArray(searchList);
    }
  }, []);

  const handleChange = (option) => {
    setSelectedOption(option);
  };

  // 검색했을 때 로컬스토리지에 검색어, 주소 저장
  const onSearchFormSubmit = (e) => {
    // 검색어가 없을 때
    if (!selectedOption) {
      alert("검색어를 입력해주세요.");
      e.preventDefault();
      return false;
    }

    setSearchArray((arr) => {
      const currentDate = new Date();
      // 만료 기간 설정, 하루 후
      const nextDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000); // 하루 후로 설정
      // 중복된 검색어를 제외하고 새로운 배열 생성
      const newArr = arr.filter((obj) => obj.value !== selectedOption.value);

      // 검색어 추가
      newArr.unshift({ value: selectedOption.value, expires: nextDate });

      // 중복값 제거
      const valueSet = new Set();
      const setArray = newArr.filter((item) => {
        if (!valueSet.has(item.value)) {
          valueSet.add(item.value);
          return true; // 필터링된 결과에 포함
        }
        return false; // 중복된 경우 제외
      });

      // 로컬스토리지에 검색어와 만료 기간 저장
      localStorage.setItem("recentSearch", JSON.stringify(setArray));

      return setArray; // 업데이트된 배열 반환
    });

    navigate(`/lesson_search?keyword=${selectedOption.value}`);
  };

  // 현재 시간과 최근 검색어 검색 시간 비교하여
  // 검색 1일 후 최근 검색어 배열에서 삭제되도록 함
  const getExpireItem = (key) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;
    const itemArr = JSON.parse(itemStr);
    const currentDate = new Date().getTime();
    const resultArr = itemArr.filter((item) => {
      const itemExpires = new Date(item.expires).getTime();
      return currentDate < itemExpires;
    });

    return resultArr;
  };

  const handleDelete = (e, word) => {
    e.preventDefault();
    const filteredArray = searchArray.filter((item) => item.value !== word);
    setSearchArray(filteredArray);
    localStorage.setItem("recentSearch", JSON.stringify(filteredArray));
  };
  //localStorage.removeItem("recentSearch");

  return (
    <Container>
      <SearchCont>
        <SearchSelect
          options={options}
          styles={CustomStyles}
          placeholder=""
          onChange={handleChange}
        />
        <SearchButton onClick={(e) => onSearchFormSubmit(e)} type="button">
          <SearchIcon />
        </SearchButton>
      </SearchCont>

      {searchArray.length > 0 && (
        <>
          <SearchTitle>최근 검색어</SearchTitle>
          <RecentArea>
            {searchArray.map((word, idx) => {
              return (
                <li key={`keyword${idx}`}>
                  <Link
                    to={`/lesson_search?keyword=${encodeURIComponent(
                      word.value
                    )}`}
                  >
                    {word.value}
                    <StyledClose onClick={(e) => handleDelete(e, word.value)} />
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

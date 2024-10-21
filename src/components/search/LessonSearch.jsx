import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import ListItem from "./ListItem";
import KakaoMap from "./KakaoMap";
import FilterComponent from "../item/Filter";
import {
  MapCont,
  LessonSearchCon,
  Inputbox,
  SearchSelect,
  StyledSearchIcon,
  ItemCont,
  NoItem,
  SearchSelectStyles,
} from "./SearchStyles";
import { loginUserCheck } from "../../api/loginUserCheck";
import { getSearchClass, fetchClass } from "../../api/class";
import MapContainer from "./MapContainer";

const LessonSearch = () => {
  const SearchSelectEl = useRef();
  const [searchParams, setSearchParams] = useSearchParams();
  const [classList, setClassList] = useState([]); // 사용자 주소 근처의 장소만 불러오기
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
  const [userAddress, setUserAddress] = useState("");

  useEffect(() => {
    // 쿼리 값 가져와 searchSelect 상태에 저장(초기화)
    if (!searchSelect) {
      setSearchSelect(searchParams.get("keyword"));
    }

    // 유저 주변 수업 리스트 가져오기
    const getClassList = async () => {
      const classList = await getSearchClass(searchSelect);
      if (classList) {
        const AroundClasses = classList.filter((el) => {
          return el.main_location.includes(userAddress);
        });
        setClassList(AroundClasses);
        console.log(classList);
      } else {
        setClassList([]);
      }
    };
    getClassList();
  }, [userAddress, searchSelect]);

  useEffect(() => {
    // 유저 주소 정보 가져오기
    const getUserAddress = async () => {
      const result = await loginUserCheck();
      setUserAddress(result.data.base_address);
    };

    getUserAddress();
  }, []);

  return (
    <div>
      <MapCont>
        <MapContainer places={classList} address={userAddress} />
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
            {classList.length > 0 ? (
              classList.map((el, key) => {
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
              })
            ) : (
              <ItemCont>
                <NoItem>검색한 수업이 없습니다.</NoItem>
              </ItemCont>
            )}
          </ItemCont>
          <div id="pagination"></div>
        </div>
      </LessonSearchCon>
    </div>
  );
};

export default LessonSearch;

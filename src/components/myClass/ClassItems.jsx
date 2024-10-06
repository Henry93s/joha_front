import React, { useCallback, useEffect, useState } from "react";
import {
  ListItem,
  Image,
  DetailContainer,
  Title,
  Price,
} from "./MyClassStyle";
import { Link } from "react-router-dom";

const ClassItem = ({ key, CheckboxOption, Class }) => {
  /** 각 수업 클릭 시 상세 페이지로 이동 */
  // 수업 상세 정보를 받고 link + nanoid + 쿼리 스트링 포멧 state
  const [link, setLink] = useState("");
  const [query, setQuery] = useState("");

  // detail 페이지 연결은 쿼리 포멧팅 후 쿼리를 적용한 Link 컴포넌트로 연결 
  const formatObject = useCallback((obj, nanoid) => {
    setLink(`/room/my/details/${nanoid}`);
    // URL 에서 일부 특수문자를 포함 시킬 때 URL 인코딩 과정을 추가해야 함.
    const objCopy = {nanoid: nanoid};
    setQuery(`?${Object.entries(objCopy).map(([key, value]) => `${key}=${value}`).join('&')}`);
    return;
  },[])

  // 수업 정보를 받아서 쿼리스트링 포멧팅 함수에 전달
  useEffect(() => {
    formatObject(Class, Class.nanoid);
    return;
    // 의존성 배열 수정하여 Class 이 변할 때만 동작하도록 하여 삭제 후 취소 시 타이틀이 url 형태로 변동되지 않도록 함
  },[Class && Class.nanoid]);

  return (
    // Link 컴포넌트 (pathname 은 경로까지만, search 는 나머지 query)
     <Link to={{pathname: link, search: query}}>
      <ListItem>
        <Image $imageUrl={Class.main_image} >
          <CheckboxOption key={Class.nanoid} value={Class.nanoid}
           onClick={e => e.stopPropagation()} /> 
           {/* (윗 문장 e.stopPropagation(): 이벤트 전파 방지(Link는 동작안하고 체크박스만 동작하게 함) */}
        </Image>
        <DetailContainer>
          <Title>{Class.title}</Title>
          <Price>{Number(Class.price).toLocaleString()}원</Price>
        </DetailContainer>
      </ListItem>
     </Link>
  );
};

export default ClassItem;

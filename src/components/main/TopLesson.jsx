import styled from "styled-components";
import LessonItem from "./LessonItem";
import { ReactComponent as Filter } from "../../assets/icons/filter.svg"; // SVG 파일을 컴포넌트로 import
import { useState } from "react";

const Container = styled.div`
  padding: 30px 15px 0;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
`;

const Title = styled.h2`
  font-size: 20px;
`;

const FilterBox = styled.div`
  display: flex;
  align-items: center;
`;
const FilterSelect = styled.select`
  background: none;
  color: var(--main-color);
  border: 0;
  appearance: none;
`;

const StyledFilter = styled(Filter)`
  & path {
    stroke: var(--main-color);
  }
  margin-right: 3px;
`;

const LessonCont = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const TopLesson = () => {
  const dataArr = [
    {
      image: "",
      title: "헬스",
      star: "4.5",
      name: "마동석",
      price: "10,000",
      comment: 19,
      view: 90,
    },
    {
      image: "",
      title: "필라테스",
      star: "4.6",
      name: "홍길동",
      price: "13,000",
      comment: 33,
      view: 120,
    },
    {
      image: "",
      title: "피아노",
      star: "4.8",
      name: "홍길동",
      price: "15,000",
      comment: 12,
      view: 110,
    },
    {
      image: "",
      title: "모자 뜨개질",
      star: "4.2",
      name: "김철수",
      price: "20,000",
      comment: 21,
      view: 100,
    },
  ];

  const [filterDataArr, setFilterDataArr] = useState(dataArr);

  const changeHandler = (e) => {
    const value = e.target.value;

    // 데이터 배열을 정렬하는 로직
    const sortedData = [...filterDataArr].sort((a, b) => {
      if (value === "star" || value === "view" || value === "comment") {
        return b[value] - a[value]; // 내림차순 정렬
      }
      return 0;
    });
    // 정렬된 데이터를 상태로 업데이트
    setFilterDataArr(sortedData);
  };
  return (
    <Container>
      <TitleBox>
        <Title>Top 10 레슨</Title>
        <FilterBox>
          <StyledFilter />
          <FilterSelect onChange={(e) => changeHandler(e)}>
            <option value="star">별점순</option>
            <option value="view">조회순</option>
            <option value="comment">댓글순</option>
          </FilterSelect>
        </FilterBox>
      </TitleBox>
      <LessonCont>
        {filterDataArr.map((data, idx) => {
          console.log(filterDataArr);
          return (
            <LessonItem
              key={`class${idx}`}
              image={data.image}
              title={data.title}
              star={data.star}
              name={data.name}
              price={data.price}
              comment={data.comment}
            />
          );
        })}
      </LessonCont>
    </Container>
  );
};

export default TopLesson;

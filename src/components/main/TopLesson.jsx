import styled from "styled-components";
import LessonItem from "./LessonItem";
import { ReactComponent as Filter } from "../../assets/icons/filter.svg"; // SVG 파일을 컴포넌트로 import
import { useEffect, useState } from "react";
import { fetchClass } from "../../api/class";

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
  const [filterDataArr, setFilterDataArr] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const dataArr = await fetchClass();
      console.log(dataArr);
      setFilterDataArr(dataArr);
    };

    fetchData();
  }, []);

  const changeHandler = (e) => {
    const value = e.target.value;

    // 데이터 배열을 정렬하는 로직
    const sortedData = [...filterDataArr].sort((a, b) => {
      if (value === "star" || value === "view" || value === "comments") {
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
            <option value="comments">댓글순</option>
          </FilterSelect>
        </FilterBox>
      </TitleBox>
      <LessonCont>
        {filterDataArr.map((data, idx) => {
          console.log(filterDataArr);
          return (
            <LessonItem
              key={`class${idx}`}
              image={data.main_image}
              title={data.title}
              star={data.star}
              price={data.price}
              comments={data.comments}
              nanoid={data.nanoid}
              author={data.author}
            />
          );
        })}
      </LessonCont>
    </Container>
  );
};

export default TopLesson;

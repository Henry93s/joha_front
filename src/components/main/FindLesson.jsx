import styled from "styled-components";
import { Link } from "react-router-dom";
import { ReactComponent as Search } from "../../assets/icons/search.svg"; // SVG 파일을 컴포넌트로 import

const Container = styled.div`
  padding: 20px 15px 0;
`;

const LessonCont = styled.div`
  border-radius: 10px;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.2);
  padding: 25px 0 0;
`;

const SearchBox = styled.div`
  text-align: center;
  padding: 14px 0 34px;
`;

const StyledSearch = styled(Search)`
  fill: var(--main-color);
  & path {
    fill: var(--main-color);
  }
  width: 44px;
  height: 44px;
`;

const Title = styled.h2`
  font-size: 16px;
  text-align: center;
`;

const FindLesson = () => {
  return (
    <Container>
      <LessonCont>
        <Title>지금 주변에 있는 레슨을 찾아보세요 !</Title>
        <SearchBox>
          <Link to="/search">
            <StyledSearch />
          </Link>
        </SearchBox>
      </LessonCont>
    </Container>
  );
};

export default FindLesson;

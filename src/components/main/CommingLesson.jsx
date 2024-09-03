import styled from "styled-components";

const Container = styled.div`
  padding: 20px 15px 0;
`;

const LessonCont = styled.div`
  border-radius: 10px;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.2);
  padding: 20px 30px 20px;
`;

const Title = styled.h2`
  font-size: 18px;
`;

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TextBox = styled.div`
  font-size: 14px;
  p {
    padding-bottom: 5px;
  }
`;

const TeacherInfoBox = styled.div`
  display: flex;
  align-items: center;
`;

const TeacherProfile = styled.div`
  width: 40px;
  height: 40px;
  background: #ddd;
  border-radius: 50%;
  margin-left: 20px;
  & img {
    width: 100%;
  }
`;

const ImgBox = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 10px;
  background: #d9d9d9;
  & img {
    width: 100%;
  }
`;

const CommingLesson = () => {
  return (
    <Container>
      <LessonCont>
        <Title>다가오는 레슨</Title>
        <FlexBox>
          <TextBox>
            <p>헬스 17 : 30 ~ 19 : 00</p>
            <TeacherInfoBox>
              마동석 강사님
              <TeacherProfile></TeacherProfile>
            </TeacherInfoBox>
          </TextBox>
          <ImgBox></ImgBox>
        </FlexBox>
      </LessonCont>
    </Container>
  );
};

export default CommingLesson;

import styled from "styled-components";
import arrow from "../../assets/icons/arrow.png";

const CommentDiv = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 15px 0;
  border-bottom: 1px solid #ddd;
  & p {
    font-size: 16px;
    font-weight: bold;
    padding-bottom: 4px;
  }
  & .content {
    font-size: 14px;
  }
`;
const Profile = styled.div`
  border-radius: 10px;
  width: 11vw;
  height: 11vw;
  max-width: 100px;
  max-height: 100px;
  overflow: hidden;
  background: #eee;
  & img {
    width: 100%;
  }
`;
const LeftBox = styled.div`
  width: 11vw;
  max-width: 100px;
`;
const RightBox = styled.div`
  width: 89vw;
  max-width: 600px;
`;
const Reply = styled(CommentDiv)`
  background: #f8f8f8;
  padding-left: 40px;
  position: relative;
  &::before {
    content: "";
    width: 30px;
    height: 30px;
    background: url(${arrow}) no-repeat 50% 50%;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(0, -50%) rotate(-45deg);
  }
`;

const Comment = ({ name, content }) => {
  return (
    <>
      <CommentDiv>
        <LeftBox>
          <Profile></Profile>
        </LeftBox>
        <RightBox>
          <p>{name}</p>
          <div className="content">{content}</div>
        </RightBox>
      </CommentDiv>

      {/*
      <Reply>
        <LeftBox>
          <Profile></Profile>
        </LeftBox>
        <RightBox>
          <p>박보은</p>
          <div className="content">
            안녕하세요!안녕하세요!안녕하세요!안녕하세요!dd
          </div>
        </RightBox>
      </Reply>
*/}
    </>
  );
};

export default Comment;

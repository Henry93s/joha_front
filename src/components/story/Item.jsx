import styled from "styled-components";
import { ReactComponent as Recommend } from "../../assets/icons/recommend.svg"; // SVG 파일을 컴포넌트로 import
import { ReactComponent as Comment } from "../../assets/icons/comment.svg"; // SVG 파일을 컴포넌트로 import
import { Link } from "react-router-dom";
import { deleteStoryData, editStoryData } from "../../api/story";

const List = styled(Link)`
  display: block;
  margin-bottom: 20px;
  color: initial;
`;

const ThumbNailBox = styled.div`
  border-radius: 15px;
  background: #ddd;
  height: 47vw;
  max-height: 330px;
  overflow: hidden;
  & img {
    width: 100%;
  }
`;
const InfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 6px;
`;
const Title = styled.p`
  font-size: 16px;
  font-weight: bold;
  padding-bottom: 2px;
`;
const IconBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 11px;
  & svg {
    width: 16px;
    height: 16px;
    margin-right: 2px;
  }
  & svg path {
    fill: #aaa;
  }
`;
const Icon = styled.div`
  margin-right: 5px;
`;
const EditBtn = styled.button`
  color: var(--main-color);
  font-size: 12px;
  background: none;
  margin-right: 8px;
  text-decoration: underline;
`;
const DeleteBtn = styled.button`
  color: #e54e4e;
  font-size: 12px;
  background: none;
  text-decoration: underline;
`;

const Item = ({ image, title, recommend, comment, nanoid, setData }) => {
  const editHandler = (e) => {
    e.preventDefault();
    const resultData = editStoryData();
    setData(resultData);
  };

  const deleteHandler = (e) => {
    e.preventDefault();
    const resultData = deleteStoryData();
    setData(resultData);
  };

  return (
    <List to={`/story/view/${nanoid}`}>
      <ThumbNailBox>
        <img src={image} alt={title} />
      </ThumbNailBox>
      <InfoBox>
        <div>
          <Title>{title}</Title>
          <IconBox>
            <Icon>
              <Recommend />
              {recommend}
            </Icon>
            <Icon>
              <Comment />
              {comment}
            </Icon>
          </IconBox>
        </div>
        <div>
          <EditBtn type="button" onClick={editHandler}>
            수정
          </EditBtn>
          <DeleteBtn type="button" onClick={deleteHandler}>
            삭제
          </DeleteBtn>
        </div>
      </InfoBox>
    </List>
  );
};

export default Item;

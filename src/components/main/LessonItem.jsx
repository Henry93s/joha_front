import styled from "styled-components";
import { ReactComponent as Star } from "../../assets/icons/star.svg"; // SVG 파일을 컴포넌트로 import
import { ReactComponent as Comment } from "../../assets/icons/comment.svg"; // SVG 파일을 컴포넌트로 import
import { Link } from "react-router-dom";

const ItemBox = styled(Link)`
  border-radius: 10px;
  width: calc(50% - 6px);
  overflow: hidden;
  margin-bottom: 20px;
`;
const ImgBox = styled.div`
  height: 29vw;
  max-height: 240px;
  overflow: hidden;
  & image {
    width: 100%;
  }
  background: #ddd;
`;
const InfoBox = styled.div`
  border: 1px solid #dfdfdf;
  border-top: 0;
  border-radius: 0 0 10px 10px;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 10px;
  font-size: 12px;
  & + & {
    border-top: 1px solid #dfdfdf;
  }
  & .name {
    width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
const FlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
`;
const Title = styled.p`
  font-size: 12px;
`;
const SvgText = styled.p`
  font-size: 12px;
  & svg {
    margin: 0 2px 0 0;
    width: 12px;
    height: 16px;
  }
  margin-left: 4px;
`;
const Price = styled.strong`
  color: var(--main-color);
  font-size: 12px;
`;

const LessonItem = ({ image, title, star, author, price, comment }) => {
  return (
    <ItemBox>
      <ImgBox>
        <img src={image} />
      </ImgBox>
      <InfoBox>
        <Info>
          <Title>{title}</Title>
          <FlexBox>
            <SvgText>
              <Comment />
              {comment}
            </SvgText>
            <SvgText>
              <Star />
              {star}
            </SvgText>
          </FlexBox>
        </Info>
        <Info>
          <p className="name">{author}</p>
          <Price>₩{price.toLocaleString()}</Price>
        </Info>
      </InfoBox>
    </ItemBox>
  );
};

export default LessonItem;

import styled from "styled-components";
import { Link } from "react-router-dom";
import { ReactComponent as StarIcon } from "../../assets/icons/star.svg"; // SVG 파일을 컴포넌트로 import
import { ReactComponent as HeartFillIcon } from "../../assets/icons/heart-fill.svg"; // SVG 파일을 컴포넌트로 import

const ItemDiv = styled(Link)`
  display: flex;
  justify-content: space-between;
  gap: 15px;
  border-bottom: 1px solid #e6e6e6;
  padding: 15px 0;
`;
const Title = styled.p`
  font-size: 16px;
  font-weight: bold;
`;
const LeftBox = styled.div`
  width: 100%;
`;
const InfoIconBox = styled.div`
  display: flex;
  align-items: center;
  & div {
    margin-right: 4px;
  }
  & svg {
    vertical-align: 0px;
  }
  font-size: 14px;
`;
const StyledStarIcon = styled(StarIcon)`
  width: 14px;
  height: 14px;
  & path {
    fill: #222;
  }
  margin-right: 2px;
  vertical-align: -1px !important;
`;
const InfoText = styled.div`
  font-size: 14px;
  color: #999;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  padding-top: 5px;
`;

const RightBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: end;
`;
const ImageBox = styled.div`
  background: #ddd;
  border-radius: 10px;
  overflow: hidden;
  height: 65px;
  width: 65px;
  margin-top: 20px;
`;

const Item = ({ title, star, content, img, view, rocket }) => {
  const heartClickHandler = (e) => {
    e.preventDefault();
    console.log("dd");
  };

  return (
    <ItemDiv to="/">
      <LeftBox>
        <Title>{title}</Title>
        <InfoIconBox>
          <div>
            <StyledStarIcon />
            {star}
          </div>
        </InfoIconBox>
        <InfoText>{content}</InfoText>
      </LeftBox>
      <RightBox>
        <HeartFillIcon width="22px" height="22px" onClick={heartClickHandler} />

        <ImageBox src={img} />
      </RightBox>
    </ItemDiv>
  );
};

export default Item;

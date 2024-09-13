import styled from "styled-components";
import { Link } from "react-router-dom";
import { ReactComponent as StarIcon } from "../../assets/icons/star.svg"; // SVG 파일을 컴포넌트로 import
import { ReactComponent as HeartFillIcon } from "../../assets/icons/heart-fill.svg"; // SVG 파일을 컴포넌트로 import
import Heart from "../item/Heart";
import MainImage from "../item/MainImage";

const Item = styled(Link)`
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
const Price = styled.strong`
  font-size: 16px;
  font-weight: bold;
  color: var(--main-color);
  display: flex;
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
  font-size: 12px;
  color: #999;
`;
const StyledHeartIcon = styled(HeartFillIcon)`
  width: 12px;
  height: 12px;
  & path {
    fill: #999;
  }
`;
const StyledStarIcon = styled(StarIcon)`
  width: 12px;
  height: 12px;
  & path {
    fill: #999;
  }
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

const ListItem = ({
  title,
  price,
  star,
  heart,
  content,
  img,
  view,
  rocket,
}) => {
  return (
    <>
      <li>
        <Item to="/">
          <LeftBox>
            <Title>{title}</Title>
            <Price>₩{price.toLocaleString()}</Price>
            <InfoIconBox>
              <div>
                <StyledStarIcon />
                {star}
              </div>
              <div>
                <StyledHeartIcon />
                {heart}
              </div>
            </InfoIconBox>
            <InfoText>{content}</InfoText>
          </LeftBox>
          <RightBox>
            <Heart isOn={false} />
            <MainImage src={img} />
          </RightBox>
        </Item>
      </li>
    </>
  );
};

export default ListItem;

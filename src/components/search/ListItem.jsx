import { useState } from "react";
import { ReactComponent as HeartFillIcon } from "../../assets/icons/heart-fill.svg"; // SVG 파일을 컴포넌트로 import
import { ReactComponent as HeartIcon } from "../../assets/icons/heart.svg"; // SVG 파일을 컴포넌트로 import
import {
  Item,
  Title,
  LeftBox,
  Price,
  InfoIconBox,
  StyledHeartIcon,
  StyledStarIcon,
  InfoText,
  RightBox,
  ItemImageBox,
} from "./SearchStyles";

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
  const [isOn, setIsOn] = useState(false);

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
            {isOn ? (
              <HeartFillIcon width="22px" height="22px" />
            ) : (
              <HeartIcon width="22px" height="22px" />
            )}
            <ItemImageBox src={img} />
          </RightBox>
        </Item>
      </li>
    </>
  );
};

export default ListItem;

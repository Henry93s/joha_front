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
  nanoid,
  title,
  price,
  star,
  like,
  contents,
  img,
  view,
  is_premium,
}) => {
  const [isOn, setIsOn] = useState(false);

  return (
    <li>
      <Item to={`/class/view/${nanoid}`}>
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
              {like}
            </div>
          </InfoIconBox>
          <InfoText>{contents}</InfoText>
        </LeftBox>
        <RightBox>
          {isOn ? (
            <HeartFillIcon width="22px" height="22px" />
          ) : (
            <HeartIcon width="22px" height="22px" />
          )}
          <ItemImageBox bg={img} />
        </RightBox>
      </Item>
    </li>
  );
};

export default ListItem;

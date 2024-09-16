import styled from "styled-components";
import { ReactComponent as HeartIcon } from "../../assets/icons/heart.svg"; // SVG 파일을 컴포넌트로 import
import { ReactComponent as HeartFillIcon } from "../../assets/icons/heart-fill.svg"; // SVG 파일을 컴포넌트로 import

const StyledHeartIcon = styled(HeartFillIcon)`
  width: 12px;
  height: 12px;
  & path {
    fill: #999;
  }
`;
const Heart = ({ isOn }) => {
  return (
    <>
      {isOn ? (
        <HeartFillIcon width="22px" height="22px" />
      ) : (
        <HeartIcon width="22px" height="22px" />
      )}
    </>
  );
};

export default Heart;

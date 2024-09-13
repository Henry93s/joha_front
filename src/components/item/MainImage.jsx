import styled from "styled-components";

const ItemImageBox = styled.div`
  background: #ddd;
  border-radius: 10px;
  overflow: hidden;
  height: 65px;
  width: 65px;
  margin-top: 20px;
`;

const MainImage = ({ src }) => {
  return <ItemImageBox></ItemImageBox>;
};

export default MainImage;

import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import styled from "styled-components";
import { ReactComponent as Pen } from "../../assets/icons/pen.svg";

const HeaderContainer = styled.div`
  position: sticky;
  left: 0;
  top: 0;
  width: 100%;
  background: #fff;
  text-align: center;
  padding: 15px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 10;

  // header 다음 div(+ : sibling 선택자)
  & + div {
    margin-bottom: 67px;
  }
`;
const Logo = styled(Link)`
  position: absolute;
  left: 50%;
  top: 15px;
  transform: translate(-50%, 0);
  font-size: 30px;
  color: var(--main-color);
`;
const ProfileDiv = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: #ddd;
`;

const LoginLink = styled(Link)`
  color: var(--main-color) !important;
  font-size: 12px;
`;

const WriteLink = styled(Link)`
  color: var(--main-color) !important;
  font-size: 12px;
  & svg {
    margin: 0px 2px 0 0;
  }
`;

const Header = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <HeaderContainer>
      <ProfileDiv />
      <Logo to="/">JOHA</Logo>

      {path === "/story" ? (
        <WriteLink to="/story/edit">
          <Pen />
          글쓰기
        </WriteLink>
      ) : (
        <LoginLink to="/">로그인</LoginLink>
      )}
    </HeaderContainer>
  );
};

export default Header;

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as Pen } from "../../assets/icons/pen.svg";
import { ReactComponent as DefaultProfileIcon } from "../../assets/icons/profileIcon.svg";
import { logoutUser } from "../../api/logoutUser";
import { loginUserCheck } from "../../api/loginUserCheck";

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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: #ddd;
  cursor: pointer;
  & img {
    width: 100%;
  }
`;

const ProfileIcon = styled(DefaultProfileIcon)`
  width: 100%;
  height: 100%;
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

const LogoutButton = styled.button`
  background: none;
  color: var(--main-color);
  font-size: 12px;
  cursor: pointer;
`;

const Header = () => {
  const location = useLocation();
  const path = location.pathname;

  const [isLogined, setIsLogined] = useState(false);
  const [userProfile, setUserProfile] = useState("notFoundImage");
  const navigate = useNavigate();

  // 로그인 여부 확인
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await loginUserCheck();
        if (response && (response.code === 200 || response.code === 202)) {
          setIsLogined(true);
          localStorage.setItem("is_logined", "true");
          setUserProfile(response.data.photo);
        } else {
          setIsLogined(false);
          localStorage.setItem("is_logined", "false");
          setUserProfile("notFoundImage");
        }
      } catch (error) {
        console.error("로그인 사용자 확인 실패", error);
        setIsLogined(false);
        localStorage.setItem("is_logined", "false");
        setUserProfile("notFoundImage");
      }
    };
    checkLogin();
  }, []);

  const onClickLogout = async () => {
    try {
      const response = await logoutUser();
      if (response?.status === 200) {
        localStorage.setItem("is_logined", "false");
        setIsLogined(false);
        setUserProfile("notFoundImage");
        navigate("/");
      }
    } catch (error) {
      console.error("로그아웃 실패", error);
    }
  };

  const onclickProfileIcon = () => {
    isLogined ? navigate("/profile") : navigate("/login");
  };

  return (
    <HeaderContainer>
      <ProfileDiv onClick={onclickProfileIcon}>
        {userProfile !== "notFoundImage" ? (
          <img src={userProfile} title="profile" />
        ) : (
          <ProfileIcon />
        )}
      </ProfileDiv>

      <Logo to="/">JOHA</Logo>

      {path === "/story" ? (
        <WriteLink to="/story/edit">
          <Pen />
          글쓰기
        </WriteLink>
      ) : isLogined ? (
        <LogoutButton onClick={onClickLogout}>로그아웃</LogoutButton>
      ) : (
        <LoginLink to="/login">로그인</LoginLink>
      )}
    </HeaderContainer>
  );
};

export default Header;

import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.div`
    position: sticky;
    left: 0; 
    top: 0;
    width: 100%;
    background:#fff;
    text-align: center;
    padding: 15px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
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
    background:#ddd;
`;

const LoginLink = styled(Link)`
    color: var(--main-color);
    font-size: 12px;
`;

const Header = () => {
    return(
        <HeaderContainer>
            <ProfileDiv />
            <Logo to="/">JOHA</Logo>
            <LoginLink to="/">로그인</LoginLink>
        </HeaderContainer>
    )
};

export default Header;
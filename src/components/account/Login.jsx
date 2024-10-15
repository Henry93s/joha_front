import styled from "styled-components";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../api/user";
import CryptoJS from "crypto-js"; // AES 암호화를 위해 CryptoJS 사용

const LoginInput = styled.input`
    & + input {
        margin-top: 10px;
    }

    &:focus {
        border-color: var(--main-color);
        outline: none;
    }
`;

const LinkUl = styled.ul`
    text-align: center;
    padding: 15px 0;

    a {
        color: #666;
        font-size: 12px;
    }
`;

const LinkLi = styled.li`
    display: inline-block;
    margin: 0 5px;
`;

const LoginBtn = styled.button`
    cursor: pointer;
    font-size: 16px;
`;

const JoinBox = styled.div`
    text-align: center;
    padding-top: 20px;

    & a {
        font-weight: bold;
        margin-left: 5px;
        text-decoration: underline;
        color: var(--main-color);
    }
`;

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // // AES 암호화 함수
    const encryptPassword = (password, key) => {
        return CryptoJS.AES.encrypt(password, key).toString();
    };

    // 로그인 요청 핸들러
    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            // 비밀번호를 AES 방식(aes-128)으로 암호화 적용
            const key = `${process.env.REACT_APP_AES_KEY}`; // 환경변수에서 암호화 키 가져오기
            const aesPassword = encryptPassword(password, key); // 암호화된 비밀번호

            const response = await loginUser(email, aesPassword);
            if (response.status === 200) {
                localStorage.setItem("is_logined", "true");
                navigate("/");
            }
        } catch (error) {
            alert(error.response?.data?.message || "로그인 실패");
        }
    };

    return (
        <form onSubmit={onSubmitHandler}>
            <LoginInput type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
            <LoginInput
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <LinkUl>
                <LinkLi>
                    <Link to="/findId">아이디 찾기</Link>
                </LinkLi>
                |
                <LinkLi>
                    <Link to="/findPassword">비밀번호 찾기</Link>
                </LinkLi>
            </LinkUl>
            <LoginBtn type="submit">로그인</LoginBtn>
            <JoinBox>
                아직 회원이 아니세요? <Link to="/join">회원가입</Link>
            </JoinBox>
        </form>
    );
};

export default Login;

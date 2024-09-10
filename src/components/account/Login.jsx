import styled from "styled-components";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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

    // 로그인 요청 핸들러
    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            // 사용자가 입력한 필드 값들이 제대로 전달되는지 콘솔로 확인
            console.log("이메일:", email);
            console.log("비밀번호:", password);

            const response = await axios.post("http://localhost:3002/login", {
                email: email,
                password: password,
            });
            if (response.status === 200) {
                localStorage.setItem("is_logined", "true");
                navigate("/");
            }
        } catch (error) {
            console.error("로그인 실패", error);
            alert("아이디 또는 비밀번호가 잘못되었습니다.");
        }
    };

    return (
        <form onSubmit={onSubmitHandler}>
            <LoginInput
                type="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
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

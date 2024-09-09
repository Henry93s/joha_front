import styled from "styled-components";
import React, { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // test: 이메일과 비밀번호가 올바르게 입력된 경우
        if (email === "test@test.com" && password === "test123") {
            navigate("/"); // 메인 페이지로 이동
        } else {
            alert("이메일 또는 비밀번호가 올바르지 않습니다.");
        }

        // 서버 요청 응답 처리 시 사용 예정
        // try {
        //     const response = await axios.post("/login", {email, password});

        //     if ( response.status === 200) {
        //         localStorage.setItem("is_logined", "true");
        //         navigator("/");
        //     }
        // } catch (error) {
        //     console.error(error)
        // }
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

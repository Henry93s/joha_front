import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

// 기존에 index.css에서 처리하던 스타일을 제거하고 간결하게 유지

const FlexDiv = styled.div`
    display: flex;
    gap: 10px;
    & + div {
        margin-top: 10px;
    }
`;

const LoginInput = styled.input`
    border: 1px solid #ddd;
    background: #fff;
    border-radius: 15px;
    width: 100%;
    height: 50px;
    padding: 0 15px;
    ::placeholder {
        color: #666;
    }
    & + input {
        margin-top: 10px;
    }

    &:focus {
        border-color: var(--main-color);
        outline: none;
    }
`;

const RequestBtn = styled.button`
    color: var(--main-color);
    background: #fff;
    height: 50px;
    width: 120px;
    border: 1px solid var(--main-color);
    border-radius: 15px;
    &:disabled {
        color: #bbb;
        border-color: #ddd;
    }
    cursor: pointer;
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

const SubmitBtn = styled.button`
    background: var(--main-color);
    color: #fff;
    font-size: 16px;
    width: 100%;
    height: 50px;
    border: 0;
    border-radius: 15px;
    &:disabled {
        border-color: #ccc;
        background: #ccc;
    }
    cursor: pointer;
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

const FindPassword = () => {
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const emailRequestBtn = useRef(null);
    const navigate = useNavigate();

    // 이메일 인증 요청 핸들러 (테스트용으로 설정)
    const onEmailRequestHandler = (e) => {
        e.preventDefault();
        if (emailRequestBtn.current) {
            emailRequestBtn.current.disabled = true;
        }
        alert("인증 코드가 전송되었습니다.");
        // 테스트를 위해 가짜 응답 설정
        setTimeout(() => {
            console.log("테스트용 이메일 요청 완료");
        }, 1000);
    };

    // 이메일 인증 확인 핸들러 (테스트용으로 설정)
    const onEmailCheckHandler = (e) => {
        e.preventDefault();
        if (code === "123456") {
            navigate("/changePassword", { state: { email } });
        } else {
            alert("인증 번호가 올바르지 않습니다.");
        }
    };

    return (
        <form onSubmit={onEmailCheckHandler}>
            <FlexDiv>
                <LoginInput
                    type="email"
                    placeholder="이메일"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
                <RequestBtn
                    onClick={onEmailRequestHandler}
                    ref={emailRequestBtn}
                >
                    인증요청
                </RequestBtn>
            </FlexDiv>
            <FlexDiv>
                <LoginInput
                    type="text"
                    placeholder="인증번호"
                    value={code}
                    required
                    onChange={(e) => setCode(e.target.value)}
                />
            </FlexDiv>
            <LinkUl>
                <LinkLi>
                    <Link to="/findId">아이디 찾기</Link>
                </LinkLi>
                |
                <LinkLi>
                    <Link to="/login">로그인 하기</Link>
                </LinkLi>
            </LinkUl>
            <SubmitBtn type="submit">인증확인</SubmitBtn>
            <JoinBox>
                아직 회원이 아니세요?
                <Link to="/join">회원가입</Link>
            </JoinBox>
        </form>
    );
};

export default FindPassword;

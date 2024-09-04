import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

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

const ShowBtn = styled.button`
    background: #f87878;
    color: #fff;
    font-size: 16px;
    width: 100%;
    height: 50px;
    border: 0;
    border-radius: 15px;
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

const UserInfoDiv = styled.div`
    text-align: center;
    padding: 30px 0;
    border: 2px dashed #ffbebe;
    margin-top: 30px;
    border-radius: 20px;
    background: #fff6f6;
    & button {
        border: 0;
        background: 0;
        font-size: 16px;
    }
`;

const FindId = () => {
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [userId, setUserId] = useState("");

    const onSubmitHandle = async (e) => {
        e.preventDefault();

        // 가짜 응답 설정
        setTimeout(() => {
            // 여기서 "gainedUserId"는 가짜로 얻은 사용자 아이디입니다.
            const gainedUserId = "test@test.com";
            setUserId(gainedUserId);
        }, 1000); // 1초 후 가짜 응답 처리
    };

    const phoneNumberChangeHandler = (e) => {
        let inputValue = e.target.value;
        inputValue = inputValue.replace(/\D/g, ""); // 문자 입력 제거
        inputValue = inputValue.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"); // 000-0000-0000 형태로 리턴
        setPhoneNumber(inputValue);
    };

    return (
        <form onSubmit={onSubmitHandle}>
            <LoginInput
                type="text"
                placeholder="이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <LoginInput
                type="text"
                placeholder="핸드폰번호"
                value={phoneNumber || ""}
                maxLength={13}
                onChange={phoneNumberChangeHandler}
                required
            />
            <LinkUl>
                <LinkLi>
                    <Link to="/findPassword">비밀번호 찾기</Link>
                </LinkLi>
                |
                <LinkLi>
                    <Link to="/login">로그인 하기</Link>
                </LinkLi>
            </LinkUl>
            <ShowBtn type="submit">확인</ShowBtn>
            <JoinBox>
                아직 회원이 아니세요?
                <Link to="/join">회원가입</Link>
            </JoinBox>
            {userId && (
                <UserInfoDiv>
                    아이디는{" "}
                    <button type="button">
                        <b>{userId}</b>
                    </button>{" "}
                    입니다.
                </UserInfoDiv>
            )}
        </form>
    );
};

export default FindId;

import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

const ChangeInput = styled.input`
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

const MessageDiv = styled.div`
    font-size: 12px;
    color: red;
    padding: 5px 0 10px 5px;
`;

const SubmitBtn = styled.button`
    background: var(--main-color);
    color: #fff;
    font-size: 16px;
    width: 100%;
    height: 50px;
    border: 0;
    border-radius: 15px;
    margin-top: 5px;
    cursor: pointer;
`;

const ChangePassword = () => {
    const [userInfo, setUserInfo] = useState({
        password: "",
        passwordCheck: "",
    });

    const [errors, setErrors] = useState({
        passwordCheckError: "",
        passwordError: "",
    });

    const navigate = useNavigate();
    const location = useLocation(); // 이전 화면에서 전달된 이메일 정보 사용

    // 비밀번호 유효성 검사
    const validatePassword = (password) => {
        if (password.length > 0 && password.length < 8) {
            return "8자 이상 입력해주세요.";
        }
        const hasLetter = /[a-zA-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*]/.test(password);
        const validCombination = [hasLetter, hasNumber, hasSpecialChar].filter(Boolean).length >= 2;

        if (!validCombination) {
            return "영문, 숫자, 특수문자 중 2종류 이상 사용해 주세요.";
        }

        return "";
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const { password, passwordCheck } = userInfo;
        const passwordError = validatePassword(password);
        if (passwordError) {
            setErrors({ passwordError, passwordCheckError: "" });
            return;
        }

        if (password !== passwordCheck) {
            setErrors({ passwordError: "", passwordCheckError: "비밀번호가 일치하지 않습니다." });
            return;
        }

        // 테스트용 가짜 응답 처리
        setTimeout(() => {
            alert(`비밀번호가 성공적으로 변경되었습니다. (이메일: ${location.state.email})`);
            navigate("/login");
        }, 1000);
    };

    const onChangeHandler = (e) => {
        const { name, value } = e.target;

        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            [name]: value,
        }));

        if (name === "password") {
            const error = validatePassword(value);
            setErrors((prevErrors) => ({
                ...prevErrors,
                passwordError: error,
            }));
        }

        if (name === "passwordCheck") {
            setErrors((prevErrors) => ({
                ...prevErrors,
                passwordCheckError: userInfo.password !== value ? "비밀번호가 일치하지 않습니다." : "",
            }));
        }
    };

    return (
        <form onSubmit={onSubmitHandler}>
            {/* 이메일 필드 (읽기 전용) */}
            <ChangeInput
                type="email"
                value={location.state.email ? location.state.email : ""}
                readOnly
            />

            {/* 비밀번호 필드 */}
            <ChangeInput
                type="password"
                placeholder="비밀번호"
                name="password"
                value={userInfo.password}
                onChange={onChangeHandler}
            />
            {errors.passwordError && <MessageDiv>{errors.passwordError}</MessageDiv>}

            {/* 비밀번호 확인 필드 */}
            <ChangeInput
                type="password"
                placeholder="비밀번호 확인"
                name="passwordCheck"
                value={userInfo.passwordCheck}
                onChange={onChangeHandler}
            />
            {errors.passwordCheckError && <MessageDiv>{errors.passwordCheckError}</MessageDiv>}

            {/* 제출 버튼 */}
            <SubmitBtn type="submit">변경하기</SubmitBtn>
        </form>
    );
};

export default ChangePassword;
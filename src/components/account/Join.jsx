import React, { useState } from "react";
import styled from "styled-components";
import { EmailRegex, PasswordRegex, PhoneNumberRegex } from "./Regex";

const FlexDiv = styled.div`
    display: flex;
    gap: 10px;
`;

const ProfileInputWrapper = styled.div`
    text-align: center;
    margin-bottom: 50px;
`;

const ProfileLabel = styled.label`
    display: inline-block;
    width: 80px;
    height: 80px;
    background-color: #ddd;
    border-radius: 50%;
    position: relative;
    overflow: hidden;
    cursor: pointer;

    &:after {
        content: "${(props) => (props.$hasImage ? "" : "+")}";
        color: white;
        font-size: 36px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`;

const ProfileInput = styled.input`
    display: none;
`;

const ProfileImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const Input = styled.input`
    width: 100%;
    padding: 0 20px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 15px;
    box-sizing: border-box;
    height: 50px;

    &:focus {
        border-color: var(--main-color);
        outline: none;
    }
`;

const Button = styled.button`
    height: 50px;
    border-radius: 15px;
    border: 1px solid #26bdbe;
    background-color: #fff;
    color: #26bdbe;
    cursor: pointer;
    flex-shrink: 0;
    padding: 0 20px;

    &:disabled {
        color: #bbb;
        border-color: #ddd;
        background-color: #f1f1f1;
    }
`;

const JoinButton = styled.button`
    font-size: 16px;
    margin-top: 10px;
`;

const ErrorMessage = styled.p`
    color: red;
    font-size: 12px;
    margin: -5px 0 10px 5px;
`;

const Join = () => {
    const [formData, setFormData] = useState({
        email: "",
        emailCode: "",
        name: "",
        password: "",
        passwordCheck: "",
        phone: "",
        address: "",
        detailedAddress: "",
        profileImage: null,
    });

    const [errors, setErrors] = useState({
        emailError: "",
        passwordError: "",
        passwordCheckError: "",
        phoneError: "",
    });

    const [showMap, setShowMap] = useState(false);

    /** 유효성 검사 */
    const validateField = {
        email: (value) => {
            return EmailRegex(value) ? "" : "올바른 이메일 주소를 입력해주세요.";
        },
        password: (value) => {
            if (value.length < 8) {
                return "8자 이상 입력해주세요.";
            }
            const [hasLetter, hasNumber, hasSpecialChar] = PasswordRegex(value);
            const validCombination = [hasLetter, hasNumber, hasSpecialChar].filter(Boolean).length >= 2;
            return validCombination ? "" : "영문, 숫자, 특수문자 중 2종류 이상 사용해 주세요.";
        },
        passwordCheck: (value) => {
            return value === formData.password ? "" : "비밀번호가 일치하지 않습니다.";
        },
        phone: (value) => {
            return PhoneNumberRegex(value) ? "" : "올바른 전화번호 형식이 아닙니다.";
        },
    };

    // 프로필 사진 변경될때 호출 되는 함수
    const onChangeProfileHandler = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setFormData((prevData) => ({
                    ...prevData,
                    profileImage: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    // 폼 필드 값이 변경될 때 호출되는 함수
    const onChangeHandler = (e) => {
        const { name, value } = e.target;

        // 전화번호 필드는 숫자만 입력 가능하게 처리하고 형식을 적용
        const processedValue = name === "phone" ? PhoneNumberRegex(value) : value;

        setFormData((prevData) => ({
            ...prevData,
            [name]: processedValue,
        }));

        // 유효성 검사 수행
        if (validateField[name]) {
            const errorMessage = validateField[name](processedValue);
            setErrors((prevErrors) => ({
                ...prevErrors,
                [`${name}Error`]: errorMessage,
            }));
        }
    };

    // 다음 주소 우편번호 서비스 사용(API key 필요 없음)
    const onClickAddressSearchHandler = () => {
        const script = document.createElement("script");
        script.src = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        script.onload = () => {
            new window.daum.Postcode({
                oncomplete: (data) => {
                    setFormData((prevData) => ({
                        ...prevData,
                        address: data.address,
                    }));
                    setShowMap(true); // 주소가 입력되면 지도를 표시
                },
            }).open();
        };
        document.body.appendChild(script);
    };

    // 폼 제출 시 호출되는 함수
    const onSubmitHandler = (e) => {
        e.preventDefault();

        // 모든 필드 유효성 검사
        const isValid = Object.keys(validateField).reduce((acc, field) => {
            const errorMessage = validateField[field](formData[field]);

            if (errorMessage) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [`${field}Error`]: errorMessage,
                }));
                return false; // 유효하지 않은 필드가 있으면 false
            }

            return acc; // 이전 결과 반환
        }, true); // 초기 값은 true (모든 필드가 유효하다고 가정)

        if (isValid) {
            // 이곳에 폼 제출 로직 추가 (예: axios.post)
            alert("회원가입 성공");
        }
    };

    return (
        <form onSubmit={onSubmitHandler}>
            {/* 프로필 사진 업로드 */}
            <ProfileInputWrapper>
                <ProfileLabel
                    htmlFor="profile"
                    $hasImage={formData.profileImage}
                >
                    {formData.profileImage && (
                        <ProfileImage
                            src={formData.profileImage}
                            alt="프로필 미리보기"
                        />
                    )}
                </ProfileLabel>
                <ProfileInput
                    type="file"
                    id="profile"
                    name="profile"
                    accept="image/*"
                    onChange={onChangeProfileHandler}
                />
            </ProfileInputWrapper>

            {/* 이메일 필드 */}
            <FlexDiv>
                <Input
                    type="email"
                    name="email"
                    placeholder="이메일"
                    value={formData.email}
                    onChange={onChangeHandler}
                    required
                />
                <Button type="button">인증요청</Button>
            </FlexDiv>
            <ErrorMessage>{errors.emailError}</ErrorMessage>

            {/* 인증번호 필드 */}
            <FlexDiv>
                <Input
                    type="text"
                    name="emailCode"
                    placeholder="인증번호"
                    value={formData.emailCode}
                    onChange={onChangeHandler}
                    required
                />
                <Button type="button">인증확인</Button>
            </FlexDiv>

            {/* 이름 필드 */}
            <Input
                type="text"
                name="name"
                placeholder="이름"
                value={formData.name}
                onChange={onChangeHandler}
                required
            />

            {/* 비밀번호 필드 */}
            <Input
                type="password"
                name="password"
                placeholder="비밀번호"
                value={formData.password}
                onChange={onChangeHandler}
                required
            />
            <ErrorMessage>{errors.passwordError}</ErrorMessage>

            {/* 비밀번호 확인 필드 */}
            <Input
                type="password"
                name="passwordCheck"
                placeholder="비밀번호 확인"
                value={formData.passwordCheck}
                onChange={onChangeHandler}
                required
            />
            <ErrorMessage>{errors.passwordCheckError}</ErrorMessage>

            {/* 휴대폰번호 필드 */}
            <Input
                type="text"
                name="phone"
                placeholder="휴대폰번호"
                value={formData.phone}
                onChange={onChangeHandler}
                maxLength={13}
                required
            />
            <ErrorMessage>{errors.phoneError}</ErrorMessage>

            {/* 기본 주소 필드 */}
            <Input
                type="text"
                name="address"
                placeholder="기본 주소"
                value={formData.address}
                onClick={onClickAddressSearchHandler}
                onChange={onChangeHandler}
                readOnly
                required
            />

            {/* 상세 주소 필드 */}
            <Input
                type="text"
                name="detailedAddress"
                placeholder="상세 주소"
                value={formData.detailedAddress}
                onChange={onChangeHandler}
                required
            />

            {/* 가입하기 버튼 */}
            <JoinButton type="submit">가입하기</JoinButton>
        </form>
    );
};

export default Join;

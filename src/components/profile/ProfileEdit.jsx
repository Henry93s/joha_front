import React, { useState } from "react";
import styled from "styled-components";
import { PasswordRegex, PhoneNumberRegex } from "../account/Regex";
import { useNavigate } from "react-router-dom";
import { editUserData } from "../../api/profile";
// import CryptoJS from "crypto-js"; // AES 암호화를 위해 CryptoJS 사용

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

const SaveButton = styled.button`
    width: 100%;
    height: 50px;
    border-radius: 15px;
    border: 1px solid #26bdbe;
    background-color: #26bdbe;
    color: white;
    font-size: 16px;
    cursor: pointer;

    &:disabled {
        color: #bbb;
        border-color: #ddd;
        background-color: #f1f1f1;
    }
`;

const ErrorMessage = styled.p`
    color: red;
    font-size: 12px;
    margin: -5px 0 10px 5px;
`;

const ProfileEdit = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "test@test.com",
        password: "",
        passwordCheck: "",
        name: "",
        phone: "",
        address: "",
        detailedAddress: "",
        profileImage: null,
    });

    const [errors, setErrors] = useState({
        passwordError: "",
        passwordCheckError: "",
        phoneError: "",
    });

    /** 유효성 검사 */
    const validateField = {
        password: (value) => {
            if (value.length < 10) {
                return "10자 이상 입력해주세요.";
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

    // 프로필 사진 변경될 때 호출 되는 함수
    const onChangeProfileHandler = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prevData) => ({
                ...prevData,
                profileImage: file, // 파일 자체를 저장
            }));
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
                },
            }).open();
        };
        document.body.appendChild(script);
    };

    // 폼 제출 시 호출되는 함수
    const onSubmitHandler = async (e) => {
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
        }, true); // 초기 값은 true

        if (isValid) {
            try {
                // FormData 객체를 사용하여 데이터 전송
                const formDataSend = new FormData();
                formDataSend.append("name", formData.name);
                formDataSend.append("password", formData.password);
                formDataSend.append("phone", formData.phone);
                formDataSend.append("base_address", formData.address);
                formDataSend.append("detail_address", formData.detailedAddress);

                // 프로필 이미지가 있을 경우에만 추가
                if (formData.profileImage) {
                    formDataSend.append("photo", formData.profileImage);
                }

                // FormData 전송
                const response = await editUserData(formDataSend);

                // 수정 성공 시
                if (response.status === 200) {
                    alert("정보가 성공적으로 수정되었습니다.");
                    navigate("/profile");
                }
            } catch (error) {
                // 실패 시 백엔드에서 온 에러 메시지 사용
                alert(error.response?.data?.message || "정보 수정에 실패했습니다.");
            }
        }
    };

    return (
        <form onSubmit={onSubmitHandler}>
            {/* 프로필 사진 업로드 */}
            <ProfileInputWrapper>
                <ProfileLabel htmlFor="profile" $hasImage={formData.profileImage}>
                    {formData.profileImage && (
                        <ProfileImage
                            src={URL.createObjectURL(formData.profileImage)} // 이미지 미리보기
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

            {/* 이메일 필드 (읽기 전용) */}
            <Input type="email" name="email" value={formData.email} readOnly />

            {/* 새 비밀번호 필드 */}
            <Input
                type="password"
                name="password"
                placeholder="새 비밀번호 입력"
                value={formData.password}
                onChange={onChangeHandler}
            />
            <ErrorMessage>{errors.passwordError}</ErrorMessage>

            {/* 새 비밀번호 확인 필드 */}
            <Input
                type="password"
                name="passwordCheck"
                placeholder="새 비밀번호 확인"
                value={formData.passwordCheck}
                onChange={onChangeHandler}
            />
            <ErrorMessage>{errors.passwordCheckError}</ErrorMessage>

            {/* 이름 필드 */}
            <Input
                type="text"
                name="name"
                placeholder="이름"
                value={formData.name}
                onChange={onChangeHandler}
                required
            />

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

            {/* 저장하기 버튼 */}
            <SaveButton type="submit">완료</SaveButton>
        </form>
    );
};

export default ProfileEdit;

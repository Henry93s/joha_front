import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PasswordRegex, PhoneNumberRegex } from "../account/Regex";
import { useNavigate, useParams } from "react-router-dom";
import { editUserData, fetchUserData } from "../../api/profile";

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
    margin-top: 10px;
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
    const { email } = useParams();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        passwordCheck: "",
        name: "",
        phone: "",
        base_address: "",
        detail_address: "",
        photo: "",
    });

    const [errors, setErrors] = useState({
        passwordError: "",
        passwordCheckError: "",
        phoneError: "",
    });

    useEffect(() => {
        const getUserData = async () => {
            const email = localStorage.getItem("email");

            if (!email) {
                console.error("로그인된 이메일 정보가 없습니다.");
                return;
            }

            try {
                const response = await fetchUserData(email);
                const userData = Array.isArray(response) ? response.find((user) => user.email === email) : response;
                console.log("user data", userData);
                if (userData) {
                    setFormData((prevData) => ({
                        ...prevData,
                        email: userData.email || "",
                        name: userData.name || "",
                        phone: userData.phone || "",
                        base_address: userData.base_address || "",
                        detail_address: userData.detail_address || "",
                        photo: userData.photo || "",
                    }));
                } else {
                    console.error("로그인한 사용자 정보를 찾을 수 없습니다.");
                }
            } catch (error) {
                console.error("유저 데이터를 가져오는 데 실패했습니다.", error);
            }
        };

        getUserData();
    }, []);

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
                photo: file,
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
                        base_address: data.address || "",
                    }));
                },
            }).open();
        };
        document.body.appendChild(script);
    };

    // 완료 버튼 클릭 시
    const onClickHandleSave = async (e) => {
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
                formDataSend.append("email", formData.email);
                formDataSend.append("name", formData.name);
                formDataSend.append("password", formData.password);
                formDataSend.append("phone", formData.phone);
                formDataSend.append("base_address", formData.base_address);
                formDataSend.append("detail_address", formData.detail_address);

                // 프로필 이미지가 새로 선택되었을 경우에만 추가
                if (formData.photo && typeof formData.photo !== "string") {
                    formDataSend.append("photo", formData.photo);
                }

                // FormData 전송 및 서버 응답 확인
                const response = await editUserData(formDataSend);
                console.log("서버 응답", response);

                // 수정 성공 시
                if (response && response.code === 200) {
                    alert("정보가 성공적으로 수정되었습니다.");
                    navigate("/profile");
                } else {
                    console.error("예상치 못한 응답 코드:", response.status);
                    alert("정보 수정에 실패했습니다.");
                }
            } catch (error) {
                // 실패 시 백엔드에서 온 에러 메시지 사용
                alert(error.response?.data?.message || "정보 수정에 실패했습니다.");
            }
        }
    };

    return (
        <>
            {/* 프로필 사진 업로드 */}
            <ProfileInputWrapper>
                <ProfileLabel htmlFor="profile" $hasImage={formData.photo}>
                    {formData.photo &&
                        (typeof formData.photo === "string" ? (
                            // formData.photo가 문자열인 경우, 즉 URL로 바로 사용할 수 있는 경우
                            <ProfileImage src={formData.photo} alt="프로필 미리보기" />
                        ) : (
                            // formData.photo가 파일인 경우, URL.createObjectURL로 미리보기 생성
                            <ProfileImage src={URL.createObjectURL(formData.photo)} alt="프로필 미리보기" />
                        ))}
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
                readOnly
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
                name="base_address"
                placeholder="기본 주소"
                value={formData.base_address || ""}
                onClick={onClickAddressSearchHandler}
                readOnly
                required
            />

            {/* 상세 주소 필드 */}
            <Input
                type="text"
                name="detail_address"
                placeholder="상세 주소"
                value={formData.detail_address}
                onChange={onChangeHandler}
                required
            />

            {/* 저장하기 버튼 */}
            <SaveButton onClick={onClickHandleSave}>완료</SaveButton>
        </>
    );
};

export default ProfileEdit;

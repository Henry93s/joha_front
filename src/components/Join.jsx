import React from "react";
import styled from "styled-components";

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
        content: "+";
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

const Input = styled.input`
    width: 100%;
    padding: 0 20px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 15px;
    box-sizing: border-box;
    height: 50px;
    font: inherit;

    &:focus {
        border-color: var(--main-color);
        outline: none;
    }

    &::placeholder {
        color: #757575;
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
    font: inherit;

    &:disabled {
        color: #bbb;
        border-color: #ddd;
        background-color: #f1f1f1;
    }
`;

const JoinButton = styled(Button)`
    width: 100%;
    background-color: #26bdbe;
    border: none;
    font-size: 16px;
    margin-top: 10px;
`;

const Join = () => {
    return (
        <form>
            {/* 프로필 사진 업로드 */}
            <ProfileInputWrapper>
                <ProfileLabel htmlFor="profile" />
                <ProfileInput
                    type="file"
                    id="profile"
                    name="profile"
                    accept="image/*"
                />
            </ProfileInputWrapper>

            {/* 이메일 필드 */}
            <FlexDiv>
                <Input
                    type="email"
                    placeholder="이메일"
                />
                <Button type="button">인증요청</Button>
            </FlexDiv>

            {/* 인증번호 필드 */}
            <FlexDiv>
                <Input
                    type="text"
                    placeholder="인증번호"
                />
                <Button type="button">인증확인</Button>
            </FlexDiv>

            {/* 이름 필드 */}
            <Input
                type="text"
                placeholder="이름"
            />

            {/* 비밀번호 필드 */}
            <Input
                type="password"
                placeholder="비밀번호"
            />

            {/* 비밀번호 확인 필드 */}
            <Input
                type="password"
                placeholder="비밀번호 확인"
            />

            {/* 휴대폰번호 필드 */}
            <Input
                type="text"
                placeholder="휴대폰번호"
            />

            {/* 기본 주소 필드 */}
            <Input
                type="text"
                placeholder="기본 주소"
            />

            {/* 상세 주소 필드 */}
            <Input
                type="text"
                placeholder="상세 주소"
            />

            {/* 가입하기 버튼 */}
            <JoinButton type="submit">가입하기</JoinButton>
        </form>
    );
};

export default Join;

import React from "react";
import styled from "styled-components";
import { ReactComponent as DefaultProfileIcon } from "../../assets/icons/profileIcon.svg";
import { ReactComponent as ArrowIcon } from "../../assets/icons/arrow.svg";

const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
`;

const ProfileContentWrapper = styled.div`
    width: 100%;
`;

const ProfileHeader = styled.header`
    display: flex;
    align-items: center;
    padding-bottom: 30px;
    box-shadow: 0px 7px 3px -2px rgba(0, 0, 0, 0.1);
`;

const ProfileImageWrapper = styled.div`
    width: 60px;
    height: 60px;
    background-color: #d9d9d9;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 20px;
`;

const ProfileImage = styled.img`
    width: 100%;
    height: 100%;
`;

const ProfileDetail = styled.div`
    display: flex;
    flex-direction: column;
`;

const ProfileName = styled.h3`
    font-size: 16px;
`;

const ProfileEmail = styled.p`
    font-size: 16px;
`;

const ProfileSection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 0px 0px 20px;
`;

const ProfileLabel = styled.button`
    background: none;
    border: none;
    cursor: pointer;
`;

const ProfileArrowButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;

    svg {
        transform: rotate(180deg);
    }
`;

const ProfileDelete = styled.button`
    background: none;
    border: none;
    color: #aaa;
    cursor: pointer;
`;

const ProfileLogout = styled.button`
    padding: 15px;
    background-color: white;
    color: var(--main-color);
    border: 1px solid var(--main-color);
    border-radius: 15px;
    font-size: 16px;
    transition: background-color 1s;
    cursor: pointer;

    position: fixed;
    bottom: 20px;
    left: 20px;
    right: 20px;

    &:hover {
        background-color: var(--main-color);
        color: white;
    }
`;

const Profile = () => {
    const userPhoto = "";
    return (
        <ProfileContainer>
            <ProfileContentWrapper>
                <ProfileHeader>
                    <ProfileImageWrapper>
                        {userPhoto ? <ProfileImage src={userPhoto} alt="Profile" /> : <DefaultProfileIcon />}
                    </ProfileImageWrapper>
                    <ProfileDetail>
                        <ProfileName>홍길동</ProfileName>
                        <ProfileEmail>test.test.com</ProfileEmail>
                    </ProfileDetail>
                </ProfileHeader>

                <ProfileSection>
                    <ProfileLabel>개인정보 수정</ProfileLabel>
                    <ProfileArrowButton>
                        <ArrowIcon />
                    </ProfileArrowButton>
                </ProfileSection>

                <ProfileSection>
                    <ProfileLabel>1:1 고객센터</ProfileLabel>
                    <ProfileArrowButton>
                        <ArrowIcon />
                    </ProfileArrowButton>
                </ProfileSection>

                <ProfileSection>
                    <ProfileDelete>회원 탈퇴</ProfileDelete>
                </ProfileSection>
            </ProfileContentWrapper>

            <ProfileLogout>로그아웃</ProfileLogout>
        </ProfileContainer>
    );
};

export default Profile;

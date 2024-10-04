import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as DefaultProfileIcon } from "../../assets/icons/profileIcon.svg";
import { ReactComponent as ArrowIcon } from "../../assets/icons/arrow.svg";
import { useNavigate } from "react-router-dom";
// import loginState from "../../atoms/loginState";
// import { useRecoilValue } from "recoil";
import { logoutUser } from "../../api/logoutUser";
import { deleteUser, fetchUserData } from "../../api/profile";

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
    // const user = useRecoilValue(loginState);
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        // is_logined가 false인 경우 로그인 페이지로 이동하는 코드 나중에 주석 해제
        // 프로필 페이지 말고 Header에서 프로필페이지 이동 클릭 시에 코드 추가해도 가능할 것 같음.

        // if (!user.is_logined) {
        //     navigate("/login");
        // }

        // if (user.is_logined) {
        const getUserData = async () => {
            const email = localStorage.getItem("email");

            if (!email) {
                console.error("로그인된 이메일 정보가 없습니다.");
                return;
            }

            try {
                const response = await fetchUserData(email);
                const userData = Array.isArray(response) ? response.find((user) => user.email === email) : response;

                if (userData) {
                    setUser(userData);
                    console.log("로그인 user data", userData);
                } else {
                    console.error("로그인한 사용자 정보를 찾을 수 없습니다.");
                }
            } catch (error) {
                console.error("유저 데이터를 가져오는 데 실패했습니다.", error);
            }
        };

        getUserData();
        // }
    }, []);

    /** 개인정보 수정 클릭 시 */
    const onClickProfileEditHandler = () => {
        navigate(`/profile/edit/${user.email}`);
    };

    /** 1:1 고객센터 클릭 시 */
    const onClickInquiryHandler = () => {
        navigate("/inquiry");
    };

    /** 회원 탈퇴 클릭 시 */
    const onClickDeleteHandler = async () => {
        if (window.confirm("정말 탈퇴하시겠습니까?")) {
            try {
                await deleteUser(user.email);

                // 탈퇴 성공 후 홈 페이지로 이동
                navigate("/");
            } catch (error) {
                console.error("회원 탈퇴에 실패했습니다.", error);
            }
        }
    };

    /** 로그아웃 클릭 시 */
    const onclickLogoutHandler = async () => {
        try {
            const response = await logoutUser();
            if (response && response.status === 200) {
                localStorage.setItem("is_logined", "false");
                navigate("/");
            }
        } catch (error) {
            console.error("로그아웃에 실패했습니다.", error);
        }
    };

    return (
        <ProfileContainer>
            {user && (
                <ProfileContentWrapper>
                    <ProfileHeader>
                        <ProfileImageWrapper>
                            {user.photo ? <ProfileImage src={user.photo} alt="Profile" /> : <DefaultProfileIcon />}
                        </ProfileImageWrapper>
                        <ProfileDetail>
                            <ProfileName>{user.name}</ProfileName>
                            <ProfileEmail>{user.email}</ProfileEmail>
                        </ProfileDetail>
                    </ProfileHeader>

                    <ProfileSection onClick={onClickProfileEditHandler}>
                        <ProfileLabel>개인정보 수정</ProfileLabel>
                        <ProfileArrowButton>
                            <ArrowIcon />
                        </ProfileArrowButton>
                    </ProfileSection>

                    <ProfileSection onClick={onClickInquiryHandler}>
                        <ProfileLabel>1:1 고객센터</ProfileLabel>
                        <ProfileArrowButton>
                            <ArrowIcon />
                        </ProfileArrowButton>
                    </ProfileSection>

                    <ProfileSection>
                        <ProfileDelete onClick={onClickDeleteHandler}>회원 탈퇴</ProfileDelete>
                    </ProfileSection>
                </ProfileContentWrapper>
            )}

            <ProfileLogout onClick={onclickLogoutHandler}>로그아웃</ProfileLogout>
        </ProfileContainer>
    );
};

export default Profile;

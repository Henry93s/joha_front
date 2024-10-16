import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as DefaultProfileIcon } from "../../assets/icons/profileIcon.svg";
import { ReactComponent as ArrowIcon } from "../../assets/icons/arrow.svg";
import { useNavigate } from "react-router-dom";
// import loginState from "../../atoms/loginState";
// import { useRecoilValue } from "recoil";
import { logoutUser } from "../../api/logoutUser";
import { deleteUser } from "../../api/profile";
import { loginUserCheck } from "../../api/loginUserCheck";

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
    box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 6px;
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
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getUserData = async () => {
            try {
                const response = await loginUserCheck();
                console.log("응답", response);
                if (response.code === 200) {
                    setUser(response.data);
                    console.log("로그인 user data", response.data);
                } else {
                    console.error("로그인한 사용자 정보를 찾을 수 없습니다.");
                }
            } catch (error) {
                console.error("유저 데이터를 가져오는 데 실패했습니다.", error);
                navigate("/login");
            }
        };

        getUserData();
    }, [navigate]);

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
            if (response.status === 200) {
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

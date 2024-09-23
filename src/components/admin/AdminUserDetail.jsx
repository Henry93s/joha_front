import React from "react";
import styled from "styled-components";
import { ReactComponent as DefaultProfileIcon } from "../../assets/icons/profileIcon.svg";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
`;

const ProfileIconWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    background-color: #ddd;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 50px;
`;

const ProfileImage = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
`;

const ProfileItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 50px;
    padding: 10px 20px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 15px;
`;

const Label = styled.span`
    font-size: 14px;
    font-weight: bold;
    flex-basis: 25%;
`;

const Value = styled.span`
    font-size: 14px;
    flex-basis: 75%;
    text-align: left;
`;

const Button = styled.button`
    width: 100%;
    padding: 15px;
    background-color: white;
    color: var(--main-color);
    border: 1px solid var(--main-color);
    border-radius: 15px;
    font-size: 16px;
    margin-top: 80px;
    transition: background-color 1s;
    cursor: pointer;

    &:hover {
        background-color: var(--main-color);
        color: white;
    }
`;

const AdminUserDetail = ({ user }) => {
    return (
        <Container>
            <ProfileIconWrapper>
                {user?.profileImage ? (
                    <ProfileImage
                        src={user.profileImage}
                        alt="Profile"
                    />
                ) : (
                    <DefaultProfileIcon />
                )}
            </ProfileIconWrapper>

            <ProfileItem>
                <Label>이메일</Label>
                <Value>{user?.email || "홍길동@gmail.com"}</Value>
            </ProfileItem>

            <ProfileItem>
                <Label>주소</Label>
                <Value>{user?.address || "서울시 @@구 @@동"}</Value>
            </ProfileItem>

            <ProfileItem>
                <Label>상세 주소</Label>
                <Value>{user?.detailAddress || "3층"}</Value>
            </ProfileItem>

            <ProfileItem>
                <Label>이름</Label>
                <Value>{user?.name || "홍길동"}</Value>
            </ProfileItem>

            <ProfileItem>
                <Label>전화번호</Label>
                <Value>{user?.phone || "010-0000-0000"}</Value>
            </ProfileItem>

            <Button type="button">회원 삭제</Button>
        </Container>
    );
};

export default AdminUserDetail;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { ReactComponent as DefaultProfileIcon } from "../../assets/icons/profileIcon.svg";

const UserListItem = styled.div`
    display: flex;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
    transition: background-color 1s;

    &:hover {
        background-color: #e3f6f6;
    }
`;

const UserProfile = styled.div`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #ddd;
    overflow: hidden;
    margin: 0px 30px 0px 30px;
    cursor: pointer;
`;

const UserProfileImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    cursor: pointer;
`;

const UserName = styled.span`
    font-size: 16px;
    font-weight: bold;
`;

const UserEmail = styled.span`
    font-size: 14px;
`;

const AdminUserList = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // 전체 회원 데이터 가져오기
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:3002/users");
                setUsers(response.data);
            } catch (error) {
                console.error("회원 데이터 가져오기 실패", error);
            }
        };

        fetchUsers();
    }, []);

    const onClickUserDetailHandler = (userId) => {
        navigate(`/admin/userList/${userId}`); // 회원 상세 페이지로 이동
    };

    return (
        <>
            {users.map((user) => (
                <UserListItem key={user.email}>
                    <UserProfile onClick={() => onClickUserDetailHandler(user.id)}>
                        {user.profileImg ? (
                            <UserProfileImage
                                src={user.profileImg}
                                alt={`${user.name} 프로필 이미지`}
                            />
                        ) : (
                            <DefaultProfileIcon /> // 기본 프로필 SVG 아이콘 사용
                        )}
                    </UserProfile>
                    <UserInfo onClick={() => onClickUserDetailHandler(user.id)}>
                        <UserName>{user.name}</UserName>
                        <UserEmail>{user.email}</UserEmail>
                    </UserInfo>
                </UserListItem>
            ))}
        </>
    );
};

export default AdminUserList;

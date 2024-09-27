import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { ReactComponent as DefaultProfileIcon } from "../../assets/icons/profileIcon.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";

const UserListContainer = styled.div`
    height: 100vh;
    overflow-y: auto;
`;

const SearchWrapper = styled.div`
    position: relative;
    width: 100%;
    margin-bottom: 10px;
`;

const UserSearchInput = styled.input`
    outline: none;

    &:focus {
        border: 1px solid var(--main-color);
    }
`;

const UserSearchIcon = styled(SearchIcon)`
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    width: 25px;
    height: 25px;
`;

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
    const [userSearch, setUserSearch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // 전체 회원 데이터 가져오기
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:3002/users");
                console.log("user data", response.data);

                // 회원 이름 가나다,abc 순으로 정렬 - localeCompare() 사용
                const sortedUsers = response.data.sort((a, b) => {
                    return a.name.localeCompare(b.name, "ko");
                });

                setUsers(sortedUsers);
            } catch (error) {
                console.error("회원 데이터 가져오기 실패", error);
            }
        };

        fetchUsers();
    }, []);

    const onClickUserDetailHandler = (email) => {
        navigate(`/admin/userList/${email}`); // 회원 이메일 기반으로 상세 페이지로 이동
    };

    // 회원 검색 필드 입력 시
    const onChangeSearchHandler = (e) => {
        setUserSearch(e.target.value);
    };

    // 검색한 내용의 맞는 회원 filter
    const filteredUsers = users.filter((user) => {
        return (
            user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
            user.email.toLowerCase().includes(userSearch.toLowerCase())
        );
    });

    return (
        <UserListContainer>
            <SearchWrapper>
                <UserSearchInput
                    type="text"
                    placeholder="회원 검색"
                    onChange={onChangeSearchHandler}
                    value={userSearch}
                />
                <UserSearchIcon />
            </SearchWrapper>

            {filteredUsers.map((user) => (
                <UserListItem key={user._id}>
                    <UserProfile onClick={() => onClickUserDetailHandler(user.email)}>
                        {user.photo && user.photo !== "notFoundImage" ? (
                            <UserProfileImage
                                src={user.photo}
                                alt={`${user.name} 프로필 이미지`}
                            />
                        ) : (
                            <DefaultProfileIcon /> // 기본 프로필 SVG 아이콘 사용
                        )}
                    </UserProfile>
                    <UserInfo onClick={() => onClickUserDetailHandler(user.email)}>
                        <UserName>{user.name}</UserName>
                        <UserEmail>{user.email}</UserEmail>
                    </UserInfo>
                </UserListItem>
            ))}
        </UserListContainer>
    );
};

export default AdminUserList;

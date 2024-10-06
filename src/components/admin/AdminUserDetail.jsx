import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as DefaultProfileIcon } from "../../assets/icons/profileIcon.svg";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUserByEmail, deleteUserByEmail } from "../../api/user";

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

const AdminUserDetail = () => {
    const { email } = useParams(); // 이메일 기반으로 URL 파라미터 가져오기
    const navigate = useNavigate();
    const [user, setUser] = useState({
        photo: "",
        email: "",
        base_address: "",
        detail_address: "",
        name: "",
        phone: "",
        is_admin: false,
        create_at: "",
        update_at: "",
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // 이메일을 기반으로 회원 정보 가져오기
                const response = await fetchUserByEmail(email);
                console.log("user detail data", response.data);
                setUser(response.data);
            } catch (error) {
                console.error("회원 정보 불러오기 실패", error);
            }
        };

        fetchUser();
    }, [email]);

    /** 회원 삭제 클릭 시  */
    const onClickDeleteHandler = async () => {
        if (window.confirm("회원을 삭제하시겠습니까??")) {
            try {
                await deleteUserByEmail(email);
                alert("회원이 삭제되었습니다.");
                navigate("/admin/userList");
            } catch (error) {
                console.error("회원 삭제 실패", error);
            }
        }
    };

    return (
        <Container>
            <ProfileIconWrapper>
                {user.photo && user.photo !== "notFoundImage" ? (
                    <ProfileImage src={user.photo} alt="Profile" />
                ) : (
                    <DefaultProfileIcon />
                )}
            </ProfileIconWrapper>

            <ProfileItem>
                <Label>이메일</Label>
                <Value>{user.email}</Value>
            </ProfileItem>

            <ProfileItem>
                <Label>주소</Label>
                <Value>{user.base_address}</Value>
            </ProfileItem>

            <ProfileItem>
                <Label>상세 주소</Label>
                <Value>{user.detail_address}</Value>
            </ProfileItem>

            <ProfileItem>
                <Label>이름</Label>
                <Value>{user.name}</Value>
            </ProfileItem>

            <ProfileItem>
                <Label>전화번호</Label>
                <Value>{user.phone}</Value>
            </ProfileItem>

            <ProfileItem>
                <Label>관리자 여부</Label>
                <Value>{user.is_admin ? "관리자" : "일반 사용자"}</Value>
            </ProfileItem>

            <ProfileItem>
                <Label>생성 일자</Label>
                <Value>{user.create_at}</Value>
            </ProfileItem>

            <ProfileItem>
                <Label>수정 일자</Label>
                <Value>{user.update_at}</Value>
            </ProfileItem>

            <Button type="button" onClick={onClickDeleteHandler}>
                회원 삭제
            </Button>
        </Container>
    );
};

export default AdminUserDetail;

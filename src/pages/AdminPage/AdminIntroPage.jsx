import React from "react";
import Header from "../../components/layout/Header";
import SubLayout from "../../components/layout/SubLayout";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
    width: 100%;
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const UserBtn = styled.button`
    width: 350px;
    height: 70px;
    border: none;
    border-radius: 15px;
    color: white;
    background-color: #26bdbe;
    transition: background-color 1s;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;

    &:hover {
        background-color: #51cacb;
    }
`;

const AdminIntroPage = () => {
    return (
        <>
            <Header />
            <SubLayout pageTitle="관리자 페이지">
                <Container>
                    <Link to={"userList/"}>
                        <UserBtn>회원 리스트</UserBtn>
                    </Link>
                </Container>
            </SubLayout>
        </>
    );
};

export default AdminIntroPage;

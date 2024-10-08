import React from "react";
import Header from "../components/layout/Header";
import Login from "../components/account/Login.jsx";
import SubLayout from "../components/layout/SubLayout";

const LoginPage = () => {
    return (
        <>
            <Header />
            <SubLayout pageTitle="로그인">
                <Login />
            </SubLayout>
        </>
    );
};

export default LoginPage;

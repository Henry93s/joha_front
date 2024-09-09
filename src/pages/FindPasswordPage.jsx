import React from "react";
import Header from "../components/layout/Header";
import SubLayout from "../components/layout/SubLayout";
import FindPassword from "../components/account/FindPassword";

const FindPasswordPage = () => {
    return (
        <>
            <Header />
            <SubLayout pageTitle="비밀번호 찾기">
                <FindPassword />
            </SubLayout>
        </>
    );
};

export default FindPasswordPage;

import React from "react";
import Header from "../components/layout/Header";
import SubLayout from "../components/layout/SubLayout";
import FindId from "../components/account/FindId";

const FindIdPage = () => {
    return (
        <>
            <Header />
            <SubLayout pageTitle="아이디 찾기">
                <FindId />
            </SubLayout>
        </>
    );
};

export default FindIdPage;

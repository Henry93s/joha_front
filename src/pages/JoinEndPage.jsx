import React from "react";
import Header from "../components/layout/Header";
import SubLayout from "../components/layout/SubLayout";
import JoinEnd from "../components/account/JoinEnd";

const JoinEndPage = () => {
    return (
        <>
            <Header />
            <SubLayout pageTitle="회원가입 완료">
                <JoinEnd />
            </SubLayout>
        </>
    );
};

export default JoinEndPage;

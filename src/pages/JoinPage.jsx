import React from "react";
import Header from "../components/layout/Header";
import SubLayout from "../components/layout/SubLayout";
import Join from "../components/Join";

const JoinPage = () => {
    return (
        <>
            <Header />
            <SubLayout pageTitle="회원가입">
                <Join />
            </SubLayout>
        </>
    );
};

export default JoinPage;

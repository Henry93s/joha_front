import React from "react";
import Header from "../components/layout/Header";
import SubLayout from "../components/layout/SubLayout";
import Profile from "../components/profile/Profile";

const ProfilePage = () => {
    return (
        <>
            <Header />
            <SubLayout pageTitle="프로필">
                <Profile />
            </SubLayout>
        </>
    );
};

export default ProfilePage;

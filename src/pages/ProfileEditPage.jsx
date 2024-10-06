import React from "react";
import Header from "../components/layout/Header";
import SubLayout from "../components/layout/SubLayout";
import ProfileEdit from "../components/profile/ProfileEdit";

const ProfileEditPage = () => {
    return (
        <>
            <Header />
            <SubLayout pageTitle="개인정보 수정">
                <ProfileEdit />
            </SubLayout>
        </>
    );
};

export default ProfileEditPage;

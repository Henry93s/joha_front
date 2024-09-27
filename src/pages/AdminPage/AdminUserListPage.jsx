import React from "react";
import Header from "../../components/layout/Header";
import SubLayout from "../../components/layout/SubLayout";
import AdminUserList from "../../components/admin/AdminUserList";

const AdminUserListPage = () => {
    return (
        <>
            <Header />
            <SubLayout pageTitle="회원 리스트">
                <AdminUserList />
            </SubLayout>
        </>
    );
};

export default AdminUserListPage;

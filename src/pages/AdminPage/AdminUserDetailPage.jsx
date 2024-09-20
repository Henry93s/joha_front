import React from "react";
import Header from "../../components/layout/Header";
import SubLayout from "../../components/layout/SubLayout";
import AdminUserDetail from "../../components/admin/AdminUserDetail";

const AdminUserDetailPage = () => {
    return (
        <>
            <Header />
            <SubLayout pageTitle="상세 회원 정보">
                <AdminUserDetail />
            </SubLayout>
        </>
    );
};

export default AdminUserDetailPage;

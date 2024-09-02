import React from "react";
import styled from "styled-components";

const Container = styled.div`
    padding: 0 15px 60px 15px;
`;

const H2 = styled.h2`
    font-size: 20px;
    padding: 27px 0 25px;
`;

interface SubLayoutProps {
    pageTitle: string;
    children: React.ReactNode;
}

const SubLayout: React.FC<SubLayoutProps> = ({ pageTitle, children }) => {
    return (
        <>
            <Container>
                <H2>{pageTitle}</H2>
                {children}
            </Container>
        </>
    );
};

export default SubLayout;

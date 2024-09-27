import React from "react";
import InquiryIcon from "../../assets/icons/inquiry.svg";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const InquiryButtonWrapper = styled.div`
    position: fixed;
    bottom: 80px;
    right: 10px;
    z-index: 1000;
`;

const Button = styled.button`
    display: flex;
    align-items: center;
    background-color: white;
    border: none;
    border-radius: 30px;
    padding: 0px 0px 0px 13.5px;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;

    div {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #26bdbe;
        width: 54px;
        height: 54px;
        border-radius: 50%;
        margin-left: 8px;
    }

    img {
        width: 24px;
        height: 24px;
    }
`;

const InquiryButton = () => {
    const navigate = useNavigate();

    const onClickInquiryHandler = () => {
        navigate("/inquiry");
    };

    return (
        <InquiryButtonWrapper>
            <Button onClick={onClickInquiryHandler}>
                <p>1:1 문의</p>
                <div>
                    <img
                        src={InquiryIcon}
                        alt="문의 아이콘"
                    />
                </div>
            </Button>
        </InquiryButtonWrapper>
    );
};

export default InquiryButton;

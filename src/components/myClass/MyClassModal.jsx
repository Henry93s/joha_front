import React from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  width: 290px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  position: fixed;
  top: 35%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalTitle = styled.h2`
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;

const ModalButton = styled.button`
  width: 100px;
  height: 38px;
  border: 1px solid #f87878;
  border-radius: 10px;
  padding: 10px 10px;
  text-align: center;
  font-size: 12px;
  color: ${(props) => (props.type === "cancel" ? "white" : "black")};
  background-color: ${(props) => (props.type === "cancel" ? "#f87878" : "white")};
  cursor: pointer;
`;

/** 공통 모달 컴포넌트 */
const MyClassModal = ({ message, onConfirm, onCancel }) => {
  const handleConfirm = () => {
      onConfirm();
  }

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalTitle>{message}</ModalTitle>
        <ButtonContainer>
            <ModalButton onClick={handleConfirm} type="button">예</ModalButton>
            <ModalButton type="cancel" onClick={onCancel}>
              아니오
            </ModalButton>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default MyClassModal;

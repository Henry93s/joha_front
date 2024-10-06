import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  width: 300px;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
`;

const ClassModal = ({ message, onClose }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/myClass");
    if (onClose) {
      onClose();
    }
  };

  return (
    <ModalBackground onClick={handleClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={handleClose}>X</CloseButton>
        <p>{message}</p>
      </ModalContent>
    </ModalBackground>
  );
};

export default ClassModal;

import React, { useState } from "react";
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

const CheckInput = styled.input`
  width: 100%;
  height: 38px;
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
  outline: none;

  &:focus {
    border: 1px solid #f87878;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: ${(props) =>
    props.singleButton ? "center" : "space-between"};
  width: 100%;
  margin-top: 20px;
`;

const ModalButton =
  styled.button <
  { buttonType: "cancel" } >
  `
  width: 100px;
  height: 38px;
  border: 1px solid #f87878;
  border-radius: 10px;
  padding: 10px 10px;
  text-align: center;
  font-size: 12px;
  color: ${(props) => (props.buttonType === "cancel" ? "white" : "black")};
  background-color: ${(props) =>
    props.buttonType === "cancel" ? "#f87878" : "white"};
  cursor: pointer;
`;

/** 공통 모달 컴포넌트 */
const ProfileModal = ({
  message,
  onClose,
  onConfirm,
  onCancel,
  isDelete = false,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleConfirm = () => {
    if (isDelete) {
      if (inputValue === "회원 탈퇴를 진행하겠습니다") {
        onConfirm?.();
      } else {
        alert("입력된 문구가 정확하지 않습니다.");
      }
    } else {
      onConfirm?.();
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalTitle>{message}</ModalTitle>
        {isDelete && (
          <CheckInput
            type="text"
            placeholder="회원 탈퇴를 진행하겠습니다"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        )}
        <ButtonContainer singleButton={!onConfirm && !onCancel}>
          {onConfirm && onCancel ? (
            <>
              <ModalButton onClick={handleConfirm}>예</ModalButton>
              <ModalButton buttonType="cancel" onClick={onCancel}>
                아니오
              </ModalButton>
            </>
          ) : (
            <ModalButton buttonType="cancel" onClick={onClose}>
              닫기
            </ModalButton>
          )}
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ProfileModal;

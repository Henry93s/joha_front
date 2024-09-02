import styled from "styled-components";

// 컨테이너
export const Container = styled.div`
    width: 100%;
    margin: 0 auto;
    padding: 10px;
    display: flex;
    flex-direction: column;
    height: 92vh;
`;

// 헤더
export const Header = styled.header`
    text-align: center;
    margin-bottom: 20px;

    h1 {
        font-size: 24px;
        font-weight: 400;
        margin-bottom: 10px;
    }

    p {
        font-size: 14px;
        font-weight: 400;
        color: #6a6a6a;
    }
`;

// QnA 버튼 컨테이너
export const QnAButtonContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 10px;
    justify-content: flex-end;
`;

// QnA 버튼
export const QnAButton = styled.button<{ $isActive: boolean }>`
    padding: 10px;
    border: 1px solid ${(props) => (props.$isActive ? "#26bdbe" : "#cccccc")};
    border-radius: 15px;
    background: white;
    font-size: 14px;
    font-weight: 400;
    text-align: center;
    cursor: pointer;
    color: ${(props) => (props.$isActive ? "#26bdbe" : "black")};

    &:hover {
        border: 1px solid #26bdbe;
        color: #26bdbe;
    }
`;

// 채팅 컨테이너
export const ChatContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    padding-bottom: 10px;
`;

// 채팅 래퍼
export const ChatWrapper = styled.div<{ $isUser: boolean }>`
    display: flex;
    justify-content: ${(props) => (props.$isUser ? "flex-end" : "flex-start")};
    align-items: flex-start;
`;

// 채팅 메시지
export const ChatMessage = styled.div<{ $isUser: boolean }>`
    margin: 10px 0;
    padding: 10px;
    background-color: ${(props) => (props.$isUser ? "#26bdbe" : "#ececec")};
    color: ${(props) => (props.$isUser ? "white" : "black")};
    border-radius: 10px;
    max-width: 70%;
    white-space: pre-wrap;
    font-size: 0.9rem;
`;

// 아이콘 래퍼
export const IconWrapper = styled.div`
    margin-right: 10px;
    background: #ececec;
    border-radius: 15px;
`;

// 후속 버튼 컨테이너
export const FollowUpButtonContainer = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 10px;
    justify-content: flex-end;
`;

// 채팅 입력 컨테이너
export const ChatInputContainer = styled.footer`
    display: flex;
    align-items: center;
    padding-top: 10px;
`;

// 채팅 입력
export const ChatInput = styled.input<{ disabled: boolean }>`
    flex: 1;
    padding: 10px;
    border-radius: 20px;
    margin-right: 10px;
    background: #ececec !important;
    border: none !important;
    color: ${(props) => (props.disabled ? "#cccccc" : "black")};
    cursor: ${(props) => (props.disabled ? "not-allowed" : "text")};

    &:focus {
        outline-color: #26bdbe;
    }
`;

// 채팅 전송 버튼
export const ChatSendButton = styled.button<{ disabled: boolean }>`
    border: none;
    padding: 10px;
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
    border-radius: 50%;
    background: #ececec;

    svg {
        width: 24px;
        height: 24px;
    }
`;

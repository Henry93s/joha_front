import React, { useEffect, useRef, useState, useCallback } from "react";
import {
    Container,
    Header,
    QnAButtonContainer,
    QnAButton,
    ChatContainer,
    ChatWrapper,
    ChatMessage,
    IconWrapper,
    FollowUpButtonContainer,
    ChatInputContainer,
    ChatInput,
    ChatSendButton,
} from "./InquiryStyles"; // 스타일 컴포넌트들을 import
import { ReactComponent as Enter } from "../../assets/icons/enter.svg";
import { ReactComponent as Manager } from "../../assets/icons/manager.svg";

// type - 각 메시지는 텍스트, 사용자 여부, 운영자 아이콘 표시 여부 등을 포함합니다.
interface Message {
    text: string;
    isUser: boolean;
    showManager?: boolean;
    followUp?: string[];
}

// Component
const Inquiry = () => {
    // 메시지 리스트, 버튼 클릭 여부, 채팅 활성화 여부, 질문 꼬리물기 버튼 표시 여부, 한글 입력 시 중복 문제 해결을 위한 IME 상태 관리
    const [messages, setMessages] = useState<Message[]>([]);
    const [clickedButtonIndex, setClickedButtonIndex] = useState<number | null>(null);
    const [isChatActive, setIsChatActive] = useState<boolean>(false);
    const [showFollowUpButtons, setShowFollowUpButtons] = useState<boolean>(true);
    const [isComposing, setIsComposing] = useState<boolean>(false);

    // Ref: DOM 요소에 직접 접근하기 위해 사용
    const chatEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // 초기 메시지 설정
    const initialMessages: Message[] = [
        {
            text: "안녕하세요! JOHA 입니다.\n아래 내용 중 문의사항을 선택해 주세요!",
            isUser: false,
            showManager: true,
        },
    ];

    /** 질문 버튼 클릭 시 */
    const handleQuestionClick = useCallback((index: number) => {
        const answers = [
            "#자주 묻는 질문에 대한 답변입니다.\n\n1. 어떤 종류의 취미/레슨을 제공하나요?\n 저희는 다양한 취미와 레슨을 제공합니다. 음악, 미술, 요가, 댄스 등 다양한 분야의 전문가들이 레슨을 진행하고 있습니다.\n\n2. 레슨 예약 방법은?\n 레슨 예약은 각 강사의 프로필에서 직접 가능하며, 원하는 날짜와 시간을 선택하여 예약할 수 있습니다.\n\n3. 결제는 어떻게 이루어지나요?\n 모든 결제는 온라인으로 안전하게 처리되며, 신용카드, PayPal 등을 이용할 수 있습니다.",
            "#환불 / 취소 정책에 대한 답변입니다.\n\n1. 레슨 취소는 레슨 시작 24시간 전까지 가능합니다. 취소 시 전액 환불되며, 24시간 이내에 취소할 경우에는 일부 금액만 환불될 수 있습니다. 자세한 내용은 환불 정책 페이지를 참고해 주세요.",
            "#수업 날짜 변경에 대한 답변입니다.\n\n1. 수업 날짜 변경은 레슨 시작 24시간 전까지 가능합니다. 변경을 원하실 경우 강사에게 직접 메시지를 보내 변경 요청을 할 수 있습니다.",
        ];

        setClickedButtonIndex(index);
        setMessages((prevMessages) => [...prevMessages, { text: answers[index], isUser: false, showManager: true }]);
    }, []);

    /** 대화 초기화 및 버튼 상태 리셋 */
    const handleReset = useCallback(() => {
        setMessages([]);
        setClickedButtonIndex(null);
        setIsChatActive(false);
        setShowFollowUpButtons(true);
    }, []);

    /** 사용자가 입력한 메시지를 전송 */
    const handleChatSend = useCallback((message: string) => {
        if (message.trim() !== "") {
            setMessages((prevMessages) => [...prevMessages, { text: message, isUser: true }]);
        }
    }, []);

    /** "운영자와 직접 대화하기" 버튼을 눌렀을 때 채팅을 활성화 */
    const activateChat = useCallback(() => {
        setIsChatActive(true);
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: "안녕하세요! 무엇을 도와드릴까요?", isUser: false, showManager: true },
        ]);
        setShowFollowUpButtons(false);
    }, []);

    /** IME 상태를 고려하여 Enter 키 입력 시 메시지를 전송 */
    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter" && isChatActive && !isComposing) {
                e.preventDefault();
                e.stopPropagation();
                if (inputRef.current) {
                    const message = inputRef.current.value.trim();
                    if (message) {
                        handleChatSend(message);
                        inputRef.current.value = "";
                    }
                }
            }
        },
        [isChatActive, isComposing, handleChatSend],
    );

    // 메시지 업데이트 후, 스크롤을 항상 최신 메시지로 이동
    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <Container>
            <Header>
                <h1>JOHA에 문의하기</h1>
                <p>10시 ~ 18시 까지 답변을 받으실 수 있습니다.</p>
            </Header>
            <ChatContainer>
                {/* 초기 메시지 표시 */}
                {initialMessages.map((msg, index) => (
                    <ChatWrapper
                        key={index}
                        $isUser={msg.isUser}
                    >
                        {!msg.isUser && msg.showManager && (
                            <IconWrapper>
                                <Manager />
                            </IconWrapper>
                        )}
                        <ChatMessage $isUser={msg.isUser}>
                            <p>{msg.text}</p>
                        </ChatMessage>
                    </ChatWrapper>
                ))}

                {/* 버튼으로 메시지 추가 */}
                <QnAButtonContainer>
                    <QnAButton
                        $isActive={clickedButtonIndex === 0}
                        onClick={() => handleQuestionClick(0)}
                    >
                        !? 자주 묻는 질문
                    </QnAButton>
                    <QnAButton
                        $isActive={clickedButtonIndex === 1}
                        onClick={() => handleQuestionClick(1)}
                    >
                        환불 / 취소 정책
                    </QnAButton>
                    <QnAButton
                        $isActive={clickedButtonIndex === 2}
                        onClick={() => handleQuestionClick(2)}
                    >
                        수업 날짜 변경
                    </QnAButton>
                </QnAButtonContainer>

                {/* 사용자 및 운영자 메시지 표시 */}
                {messages.map((msg, index) => (
                    <React.Fragment key={index}>
                        <ChatWrapper $isUser={msg.isUser}>
                            {!msg.isUser && msg.showManager && (
                                <IconWrapper>
                                    <Manager />
                                </IconWrapper>
                            )}
                            <ChatMessage $isUser={msg.isUser}>
                                <p>{msg.text}</p>
                            </ChatMessage>
                        </ChatWrapper>
                        {!msg.isUser && showFollowUpButtons && (
                            <>
                                {index === messages.length - 1 && (
                                    <FollowUpButtonContainer>
                                        <QnAButton
                                            $isActive={false}
                                            onClick={handleReset}
                                        >
                                            처음으로 돌아가기
                                        </QnAButton>
                                        <QnAButton
                                            $isActive={false}
                                            onClick={activateChat}
                                        >
                                            운영자와 직접 대화하기
                                        </QnAButton>
                                    </FollowUpButtonContainer>
                                )}
                            </>
                        )}
                    </React.Fragment>
                ))}
                <div ref={chatEndRef} />
            </ChatContainer>
            <ChatInputContainer>
                <ChatInput
                    type="text"
                    ref={inputRef}
                    disabled={!isChatActive}
                    onKeyDown={handleKeyDown}
                    onCompositionStart={() => setIsComposing(true)} // 사용자가 한글을 입력하기 시작하면 IME 상태를 true로 설정
                    onCompositionEnd={() => setIsComposing(false)} // 한글 입력이 완료되면 IME 상태를 false로 설정
                />
                <ChatSendButton
                    disabled={!isChatActive}
                    onClick={() => {
                        if (isChatActive && inputRef.current) {
                            handleChatSend(inputRef.current.value);
                            inputRef.current.value = "";
                        }
                    }}
                >
                    <Enter />
                </ChatSendButton>
            </ChatInputContainer>
        </Container>
    );
};

export default Inquiry;

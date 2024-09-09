/** 이메일 정규 표현식 */
export const EmailRegex = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
    // .test(): 정규 표현식과 일치하면 true, false
};

/** 비밀번호 정규 표현식 */
export const PasswordRegex = (password) => {
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return [hasLetter, hasNumber, hasSpecialChar];
};

/** 전화번호 정규 표현식 (예: 010-1234-5678 형식) */
export const PhoneNumberRegex = (phone) => {
    return phone
        .replace(/[^0-9]/g, "") // 숫자만 남기기
        .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3") // 3-4-4 형태로 변환
        .substring(0, 13); // 최대 13자리까지만 유지
};

import axios from "axios";

/** 이메일 인증 코드 요청 (회원가입 페이지) */
export const requestEmailCode = async (email) => {
    try {
        const response = await axios.post("http://localhost:3002/users/verify", { email });
        return response;
    } catch (error) {
        console.error("이메일 인증 코드를 요청하는데 실패했습니다.", error);
        throw error;
    }
};

/** 이메일 인증 코드 요청 (비밀번호 찾기 페이지) */
export const passwordRequestEmailCode = async (email) => {
    try {
        const response = await axios.post("http://localhost:3002/users/verify/findpw", { email });
        return response;
    } catch (error) {
        console.error("이메일 인증 코드를 요청하는데 실패했습니다.", error);
        throw error;
    }
};

/** 이메일 인증 코드 확인 */
export const verifyEmailCode = async (email, secret) => {
    try {
        const response = await axios.post("http://localhost:3002/users/verify/confirm", { email, secret });
        return response;
    } catch (error) {
        console.error("이메일 인증 코드를 확인하는데 실패했습니다.", error);
        throw error;
    }
};

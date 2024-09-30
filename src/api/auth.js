import axios from "axios";

/** 이메일 인증 코드 요청 */
export const requestEmailCode = async (email) => {
    try {
        const response = await axios.post("/users/verify", { email });
        return response;
    } catch (error) {
        console.error("이메일 인증 코드를 요청하는데 실패했습니다.", error);
        throw error;
    }
};

/** 이메일 인증 코드 확인 */
export const verifyEmailCode = async (email, secret) => {
    try {
        const response = await axios.post("/users/verify/confirm", { email, secret });
        return response;
    } catch (error) {
        console.error("이메일 인증 코드를 확인하는데 실패했습니다.", error);
        throw error;
    }
};

/** 로그인 요청 */
export const loginUser = async (email, password) => {
    try {
        const response = await axios.post("/login", { email, password });
        return response;
    } catch (error) {
        console.error("로그인 요청에 실패했습니다.", error);
        throw error;
    }
};

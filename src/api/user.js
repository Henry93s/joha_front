import axios from "axios";

/** 전체 사용자 데이터 가져오기 (관리자 회원 리스트 페이지) */
export const fetchAllUsers = async () => {
    try {
        const response = await axios.get("http://localhost:3002/users");
        return response;
    } catch (error) {
        console.error("회원 데이터를 가져오는데 실패했습니다.", error);
        throw error;
    }
};

/** 이메일을 통해 사용자 데이터 가져오기 (관리자 회원 상세 페이지) */
export const fetchUserByEmail = async (email) => {
    try {
        const response = await axios.post(`http://localhost:3002/users/email`, { email });
        return response.data;
    } catch (error) {
        console.error("회원 데이터를 불러오는 데 실패했습니다.", error);
        throw error;
    }
};

/** 회원 삭제 (관리자 회원 상세 페이지) */
export const deleteUserByEmail = async (email) => {
    try {
        const response = await axios.delete("http://localhost:3002/users/delete", {
            data: { email },
        });
        return response.data;
    } catch (error) {
        console.error("회원 삭제에 실패했습니다.", error);
        throw error;
    }
};

/** 로그인 요청 */
export const loginUser = async (email, password) => {
    try {
        const response = await axios.post("http://localhost:3002/login", { email, password });
        return response;
    } catch (error) {
        console.error("로그인 요청에 실패했습니다.", error);
        throw error;
    }
};

/** 회원가입 formData 전송 함수 */
export const createUser = async (formDataSend) => {
    try {
        const response = await axios.post("http://localhost:3002/users", formDataSend, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response;
    } catch (error) {
        console.error("회원가입에 실패했습니다.", error);
        throw error;
    }
};

/** 아이디 찾기 (이름과 전화번호로 조회) */
export const findUserId = async (name, phoneNumber) => {
    try {
        const response = await axios.post("http://localhost:3002/users/findid", { name, phone: phoneNumber });
        return response;
    } catch (error) {
        console.error("아이디 찾기에 실패했습니다.", error);
        throw error;
    }
};

/** 비밀번호 변경 요청 */
export const changePassword = async (email, newPassword) => {
    try {
        const response = await axios.put("http://localhost:3002/users", {
            email,
            newPassword,
        });
        return response;
    } catch (error) {
        console.error("비밀번호 변경에 실패했습니다.", error);
        throw error;
    }
};

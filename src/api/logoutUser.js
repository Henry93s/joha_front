import axios from "axios";

export const logoutUser = async () => {
    try {
        const res = await axios.post(
            "http://localhost:3002/users/logout",
            {},
            {
                withCredentials: true // 쿠키 포함
            },
        );
        return res;
    } catch (e) {
        alert(e.response?.data?.message);
        console.log(e);
        return;
    }
};

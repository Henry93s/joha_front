import axios from "axios";

export const loginUserCheck = async () => {
    try {
        const res = await axios.get("/users/getuser", {
            // 쿠키를 포함시키기 위해 필요
        });
        return res.data;
    } catch (e) {
        alert(e.response?.data?.message);
        console.log(e);
        return;
    }
};

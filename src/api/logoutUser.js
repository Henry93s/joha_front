import axios from 'axios';

export const logoutUser = async () => {
    try {
        const res = await axios.post('/users/logout',{}, {
             // 쿠키를 포함시키기 위해 필요
        });
        return res;
    } catch (e) {
        alert(e.response?.data?.message);
        console.log(e);
        return;
    }
};
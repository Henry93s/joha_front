import { atom } from "recoil";

const footerState = atom({
    key: 'menu',
    default: {
        // main : "/" => "/search", 찜 : "/heart", 스케줄 : "schedule", 나의 수업 : "myclass", 스토리 : "story"
        path: "/"
    }
});

export default footerState;
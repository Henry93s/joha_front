import { useEffect, useState } from "react";
import SubLayout from "../layout/SubLayout";
import Item from "./Item";
// import axios from "axios";

const List = () => {
    const [dataArr, setDataArr] = useState([
        {
            id: 1,
            title: "봉구외벽",
            star: "4.6",
            content: "아파트 건물 등 실리콘시공(코팅작업) 발수코팅 거실 싱크대 베란다 식탁 등",
            img: "",
            view: "1000",
            rocket: false,
            isLiked: true,
        },
        {
            id: 2,
            title: "일대일 피아노 레슨",
            star: "4.2",
            content: "피아노 곡 레슨 합니다",
            img: "",
            view: "1300",
            rocket: false,
            isLiked: true,
        },
        {
            id: 3,
            title: "1:1 PT",
            star: "4.7",
            content: "1:1 PT 1:1 PT 1:1 PT 1:1 PT 1:1 PT 1:1 PT 1:1 PT ",
            img: "",
            view: "2100",
            rocket: true,
            isLiked: false,
        },
    ]);

    // 백엔드 연결 시 사용 할 코드
    // useEffect(() => {
    //     const fetchWishList = async () => {
    //         try {
    //             const response = await axios.get("http://localhost:3002/wish");
    //             setDataArr(response.data);
    //         } catch (error) {
    //             console.error("찜한 레슨 목록을 불러오는데 실패했습니다.", error);
    //         }
    //     };

    //     fetchWishList();
    // }, []);

    // 찜하기(하트아이콘) 상태 변경하기 위한 함수
    const toggleLikeHandler = (id) => {
        setDataArr((prevDataArr) => {
            const updatedDataArr = prevDataArr.map((item) =>
                item.id === id ? { ...item, isLiked: !item.isLiked } : item,
            );
            // 새로고침 시 찜하기 상태 유지 로컬 스토리지에 저장
            localStorage.setItem("wishList", JSON.stringify(updatedDataArr));
            return updatedDataArr;
        });
    };

    useEffect(() => {
        const storedWishList = localStorage.getItem("wishList");
        if (storedWishList) {
            setDataArr(JSON.parse(storedWishList));
        }
    }, []);

    return (
        <SubLayout pageTitle="찜한 레슨">
            {dataArr.map((list) => (
                <Item
                    key={`list_${list.id}`}
                    {...list}
                    onToggleLike={() => toggleLikeHandler(list.id)}
                />
            ))}
        </SubLayout>
    );
};

export default List;

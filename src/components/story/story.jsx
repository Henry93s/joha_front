import styled from "styled-components";
import { useEffect, useState } from "react";
import Select from "react-select";
import Item from "./Item";
import { fetchStoryData } from "../../api/story";

const Titlebox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
`;
const Title = styled.h2`
    font-size: 20px;
`;
const StorySelect = styled(Select)`
    border-radius: 10px;
    background: #f1f1f1;
    border: none !important;
    & input {
        height: 16px;
    }
    width: calc(100% - 50px);
`;

const Container = styled.div`
    padding: 30px 15px 10px;
`;

const options = [
    { value: "all", label: "전체" },
    { value: "view", label: "조회순" },
    { value: "comment", label: "댓글순" },
    { value: "recommend", label: "추천순" },
];
const customStyles = {
    container: (provided) => ({
        ...provided,
        width: 90, // 컨테이너의 전체 너비 조정
        fontSize: "12px",
    }),
    control: (provided) => ({
        ...provided,
        width: 90, // 선택 영역의 너비 조정
    }),
    menu: (provided) => ({
        ...provided,
        width: 90, // 드롭다운 메뉴의 너비 조정
    }),
    indicatorSeparator: (provided) => ({
        ...provided,
        display: "none", // 화살표 옆의 구분선 제거
    }),
};

const Story = () => {
    const dataArr = [
        {
            image: "",
            title: "초보자용 헬스 루틴",
            recommend: 31,
            comment: 6,
            nanoid: "123123",
            view: 11,
        },
        {
            image: "",
            title: "식단 추천",
            recommend: 12,
            comment: 1,
            nanoid: "1234",
            view: 14,
        },
        {
            image: "",
            title: "스트레칭의 중요성",
            recommend: 16,
            comment: 2,
            nanoid: "5678",
            view: 20,
        },
    ];
    const [data, setData] = useState(dataArr);
    const [select, setSelect] = useState("all");

    const selectChangeHandler = (option) => {
        setSelect(option.value);
        setData((prevData) => {
            const sortedData = [...prevData].sort((a, b) => {
                if (select === "all") {
                    return 0;
                } else {
                    return b[select] - a[select];
                }
            });
            return sortedData;
        });
    };

    useEffect(() => {
        fetchStoryData();
    }, []);
    return (
        <div>
            <Titlebox>
                <Title>JOHA Story</Title>
                <StorySelect
                    options={options}
                    styles={customStyles}
                    placeholder=""
                    defaultValue={options[0]}
                    onChange={selectChangeHandler}
                />
            </Titlebox>
            <Container>
                {data.map((list, idx) => {
                    return (
                        <Item
                            nanoid={list.nanoid}
                            title={list.title}
                            recommend={list.recommend}
                            comment={list.comment}
                            key={`storyList${idx}`}
                            setData={setData}
                        />
                    );
                })}
            </Container>
        </div>
    );
};

export default Story;

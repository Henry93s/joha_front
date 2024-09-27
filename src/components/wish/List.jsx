import SubLayout from "../layout/SubLayout";
import Item from "./Item";

const List = () => {
  const dataArr = [
    {
      title: "봉구외벽",
      star: "4.6",
      content:
        "아파트 건물 등 실리콘시공(코팅작업) 발수코팅 거실 싱크대 베란다 식탁 등",
      img: "",
      view: "1000",
      rocket: false,
    },
    {
      title: "일대일 피아노 레슨",
      star: "4.2",
      content: "피아노 곡 레슨 합니다",
      img: "",
      view: "1300",
      rocket: false,
    },
    {
      title: "1:1 PT",
      star: "4.7",
      content: "1:1 PT 1:1 PT 1:1 PT 1:1 PT 1:1 PT 1:1 PT 1:1 PT ",
      img: "",
      view: "2100",
      rocket: true,
    },
  ];

  return (
    <SubLayout pageTitle="찜한 레슨">
      {dataArr.map((list, idx) => (
        <Item
          key={`list_${idx}`}
          title={list.title}
          star={list.star}
          content={list.content}
          img={list.img}
          view={list.view}
          rocket={list.rocket}
        />
      ))}
    </SubLayout>
  );
};

export default List;

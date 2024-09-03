import styled from "styled-components";
import { Link } from "react-router-dom";
import { ReactComponent as Heart } from "../../assets/icons/heart.svg"; // SVG 파일을 컴포넌트로 import
import { ReactComponent as MyClass } from "../../assets/icons/my_class.svg"; // SVG 파일을 컴포넌트로 import
import { ReactComponent as Schedule } from "../../assets/icons/schedule.svg"; // SVG 파일을 컴포넌트로 import
import { ReactComponent as Search } from "../../assets/icons/search.svg"; // SVG 파일을 컴포넌트로 import
import { ReactComponent as Story } from "../../assets/icons/story.svg"; // SVG 파일을 컴포넌트로 import

const FooterDiv = styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
    max-width: 700px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    height: 67px;
    border-top: 1px solid #e6e6e6;
    background: #fff;
    z-index: 10;
`;

const MenuItem = styled(Link)`
    text-align: center;
    color: inherit;

    &.active {
        color: var(--main-color);
    }
    &.active svg path {
        fill: var(--main-color);
    }
`;

const MenuLabel = styled.div`
    font-size: 12px;
    padding-top: 3px;
`;

const items = [
    { component: Search, name: "검색", src: "" },
    { component: Heart, name: "찜 목록", src: "" },
    { component: Schedule, name: "스케줄", src: "" },
    { component: MyClass, name: "나의 수업", src: "" },
    { component: Story, name: "스토리", src: "" },
];

const FooterMenu = () => {
    return (
        <FooterDiv>
            {items.map(({ component: Component, name, src }) => (
                <MenuItem key={name} to={src}>
                    <Component />
                    <MenuLabel>{name}</MenuLabel>
                </MenuItem>
            ))}
        </FooterDiv>
    );
};

export default FooterMenu;

import styled, { keyframes } from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import footerState from "../../atoms/footerState";
import { useEffect, useState } from "react";
// 이미지를 import 로 불러와서 상대 경로로 참조
import search from "../../assets/icons/search.png";
import heart from "../../assets/icons/heart.png";
import schedule from "../../assets/icons/schedule.png";
import myclass from "../../assets/icons/myclass.png";
import story from "../../assets/icons/story.png";
import search_color from "../../assets/icons/search_color.png"
import heart_color from "../../assets/icons/heart_color.png"
import schedule_color from "../../assets/icons/schedule_color.png"
import myclass_color from "../../assets/icons/myclass_color.png"
import story_color from "../../assets/icons/story_color.png"

const FooterDiv = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 700px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 67px;
  border-top: 1px solid #e6e6e6;
  background: #fff;
  z-index: 10;
`;

// 커스텀 props에 대한 타입 정의
interface MenuProps {
  $linked: string;
  $menu: string;
}

const MenuItem = styled(Link)`
  width: 50px;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #333;
`;
// menuItem 의 상단 border div
// 현재 position 이 설정된 가장 가까운 부모 -> FooterDiv
const MenuItemTopBorder = styled.div<MenuProps>`
  top: 0;
  width: 70px;
  position: absolute;
  border-top: ${({ $linked, $menu }) =>
    ($linked === $menu ? '2.5px solid var(--main-color)' 
                              : 'none')};
`

const MenuLabel = styled.div<MenuProps>`
  font-size: 12px;
  padding-top: 3px;
  color: ${({ $linked, $menu }) => ($linked === $menu ? "var(--main-color)" : "inherit")};
`;

// 이미지 매핑 객체 생성
// 문자열 키에 대한 타입 유효성 검사 생략 (as const - as keyof typeof imageMap~)
const imageMap = {
  "/search": search,
  "/heart": heart,
  "/schedule": schedule,
  "/myclass": myclass,
  "/story": story,
} as const;
const imageMapColor = {
  "/search": search_color,
  "/heart": heart_color,
  "/schedule": schedule_color,
  "/myclass": myclass_color,
  "/story": story_color,
} as const;

const MenuImgDiv = styled.div<MenuProps>`
  width: 22px;
  height: 22px;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: ${({ $linked, $menu }) =>
    `url(${ $linked === $menu ? imageMapColor[$linked as keyof typeof imageMapColor] 
                              : imageMap[$linked as keyof typeof imageMap] })`};
`;

const FooterMenu = () => {
  // footer menu 전역 상태 확인 및 변경
  const location = useLocation();
  const setMenu = useSetRecoilState(footerState);
  const footerMenu = useRecoilValue(footerState);

  useEffect(() => {
    setMenu((current) => {
      const newMenu = {...current};
      const path = location.pathname;
      if(path === "/"){
        newMenu.path = "/search"
      } else {
        newMenu.path = path;
      }
      return newMenu;
    });
  },[location]);


  const items = [
    { name: "검색", linked: "/"  },
    { name: "찜 목록", linked: "/heart" },
    { name: "스케줄", linked: "/schedule" },
    { name: "나의 수업", linked: "/myclass" },
    { name: "스토리", linked: "/story" },
  ];
 
  console.log(footerMenu.path)
  console.log(`url("../../assets/icons${footerMenu.path}_color.png")`);
  console.log(`url("../../assets/icons${items[1].linked}_color.png")`)

  return (
    <FooterDiv>
      {items.map(({ name, linked }) => (
        <MenuItem key={name} to={linked} >
          <MenuItemTopBorder $linked={name === "검색" ? "/search" : linked} $menu={footerMenu.path} />
          <MenuImgDiv $linked={name === "검색" ? "/search" : linked} $menu={footerMenu.path} />
          <MenuLabel $linked={name === "검색" ? "/search" : linked} $menu={footerMenu.path}>{name}</MenuLabel>
        </MenuItem>
      ))}
    </FooterDiv>
  );
};

export default FooterMenu;

import styled from "styled-components";
import Comment from "../item/Comment";
import addImg from "../../assets/icons/addImg.png";
import { Checkbox } from "antd";
import { Zoom } from "swiper/modules";

export const SwiperDiv = styled.div`
  position: relative;
  background: #eee;
  height: 110vw;
  max-height: 700px;
  & .swiper {
    height: 100%;
  }
`;

export const ImgDiv = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  & img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

export const Container = styled.div`
  padding: 0 15px 80px;
`;

export const Title = styled.h2`
  font-size: 20px;
  padding: 15px 30px 0 0;
  position: relative;
`;

export const StarDiv = styled.div`
  font-size: 16px;
  position: absolute;
  right: 32px;
  top: 16px;
  & svg {
    margin-top: 3px;
    margin-right: 1px;
  }
`;

export const ShareBtn = styled.button`
  position: absolute;
  right: 0;
  top: 16px;
  padding: 0;
  border: 0;
  background: none;
  & svg {
    vertical-align: top;
    width: 24px;
    height: 24px;
  }
`;

export const ShareModal = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 260px;
  border-radius: 5px;
  background: #fff;
  padding: 10px 15px;
  box-sizing: border-box;
  z-index: 12;
  & button {
    border: 0;
    background: none;
    padding: 5px;
  }
  & p {
    font-size: 20px;
    font-weight: bold;
    padding-bottom: 2px;
    border-bottom: 1px solid #333;
    margin: 10px 0 10px;
  }
  & div {
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
  }
  & div > button {
    padding: 0;
    background: #fff;
    border-radius: 50%;
    border: 1px solid #ddd;
  }
  & svg,
  & img {
    vertical-align: top;
    width: 40px;
    height: 40px;
  }
`;
export const ModalCloseBtn = styled.button`
  position: absolute;
  right: 10px;
  top: 10x;
  & svg {
    width: 20px;
    height: 20px;
  }
`;

export const ModalDim = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 11;
`;

export const InfoText = styled.p`
  font-size: 16px;
  padding: 20px 0 0;
  margin: 0;
`;

export const InfoDiv = styled.div`
  font-size: 16px;
  padding: 20px 0;
  border-top: 1px solid #ddd;

  & > p {
    font-size: 16px;
    margin: 0;
    padding-bottom: 15px;
    font-weight: bold;
  }

  & > div {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
  }
  & > button {
    background: none;
    border: none;
    font-size: 16px;
    margin-top: 15px;
    padding: 0;
    text-decoration: underline;
  }
`;

export const LocationDiv = styled.div`
  padding: 20px 0;
  border-top: 1px solid #ddd;
  & p {
    font-size: 16px;
    padding: 0 0 20px;
    margin: 0;
    font-weight: bold;
  }
`;

export const Location = styled.div`
  border-radius: 15px;
  overflow: hidden;
  background: #eee;
  height: 60vw;
  max-height: 400px;
`;

export const LocationText = styled.div`
  font-size: 16px;
  padding-top: 10px;
`;

export const ApplyBtnDiv = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 100;
  width: 100%;
  max-width: 700px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 15px;
  background: #fff;
  border-top: 1px solid #ddd;
  box-sizing: border-box;
  z-index: 1;
`;

export const ApplyBtn = styled.button`
  font-size: 16px;
  padding: 0 15px;
  background: #f87878;
  color: #fff;
  height: 50px;
  border: 0;
  border-radius: 15px;
`;

export const PriceDiv = styled.div`
  font-size: 16px;
  & p {
    font-size: 14px;
    margin: 0;
  }
`;
export const PriceText = styled.div`
  font-size: 14px;
  & strong {
    font-size: 18px;
  }

  & span {
    color: var(--main-color);
  }
`;

export const ReviewDiv = styled.div`
  padding-top: 20px;
  border-top: 1px solid #ddd;
  & p {
    font-size: 16px;
    font-weight: bold;
  }
`;
export const ReviewBox = styled.div`
  max-height: 200px;
  overflow: hidden;
`;
export const Review = styled(Comment)`
  padding-bottom: 15px;
`;

/* 업로드 페이지, 등록 수정 페이지 */
export const UploadContainer = styled.div`
  width: 100%;

  & input[id*="react-select"] {
    height: auto;
  }
`;

export const ImageUploadForm = styled.form`
  width: 100%;
  padding-bottom: 30px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
// input element 를 숨기고 label 로 대신 기능을 받음 (id <=> for)
// 파일 선택, 선택된 파일 없음 숨기기 위함
export const ImageUploadLabel = styled.label.attrs((props) => ({
  style: {
    backgroundImage:
      props.$isUpload === true ? `url(${props.$newImg})` : `url(${addImg})`,
    backgroundSize: props.$isUpload === true ? "cover" : "auto",
    cursor: props.$isUpload === true ? "none" : "pointer",
  },
}))`
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #d9d9d9;
  background-position: center;
  background-repeat: no-repeat;

  position: relative;
`;
export const MainImageSpan = styled.span.attrs((props) => ({
  style: {
    display: props.$isUpload === true ? "none" : "block",
  },
}))`
  position: absolute;
  margin-top: 200px;
  color: #db1212;
  opacity: 0.6;
  font-size: 22px;
  font-weight: bold;
`;
export const SubImageUploadLabel = styled.label`
  width: calc(100% - 30px);
  height: 50px;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  background-color: var(--main-color);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 1s;

  &:hover {
    background-color: var(--main-color);
  }

  &:focus {
    outline: none;
  }
`;

export const ShortInputText = styled.input`
  width: 100%;
  height: 50px;
  border: 1px solid #ebebeb;
  border-radius: 20px;
  padding: 0 15px;
  font-size: 16px;
  // 텍스트가 input 길이 초과 시 숨기기 / 줄바꿈을 사용 안 함 / ... 표시
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  &:focus {
    outline-color: var(--main-color);
  }
`;
export const OutlineDiv = styled.div`
  width: calc(100% - 30px);
  margin: 25px 0 10px;
  border-bottom: 2px solid #ebebeb;
`;
export const InputDiv = styled.div`
  width: 100%;
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
export const InputTitle = styled.span`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 21px;
  font-weight: 500;
`;
export const InputSubTitle = styled.span`
  font-size: 16px;
  font-weight: 400;
`;

// react-select css
export const selectCustom = {
  option: (provided, state) => {
    let backgroundColor = "white";
    let color = "#333";
    if (state.isSelected) {
      backgroundColor = "var(--main-color)";
      color = "white";
    } else if (state.isFocused) {
      backgroundColor = "transparent";
    }
    return {
      ...provided,
      backgroundColor,
      color,
      padding: 20,
      borderRadius: "5px",
      fontSize: "15px",
    };
  },
  control: (provided) => ({
    ...provided,
    border: "1px solid #EBEBEB",
    borderRadius: "10px",
    boxShadow: "none",
    width: "100%",
    height: "50px",
    fontSize: "15px",
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "10px",
    width: "100%",
    fontSize: "15px",
    "z-index": 11,
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#333",
    fontSize: "15px",
  }),
};
export const smallSelectCustom = {
  ...selectCustom,
  option: (provided, state) => ({
    ...provided,
    height: "40px", // 각 옵션 항목의 높이 설정
  }),
  control: (provided) => ({
    ...provided,
    width: "120px",
    height: "40px",
    fontSize: "14px",
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "10px",
    width: "120px",
    fontSize: "14px",
    "z-index": 11,
  }),
};

export const CheckboxDiv = styled.dd`
  display: flex;
  justify-content: space-between;
  & label {
    display: block;
    text-align: center;
  }
`;

// antd 체크박스 그룹 css style 정의
export const CategoryCheckbox = styled(Checkbox.Group)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

  // 체크박스에 아이콘 붙이기 위한 css
  .ant-checkbox-wrapper {
    display: flex;
    align-items: center;
    text-align: center;
  }

  // 체크박스 안 icon css
  .icon {
    width: 20px;
    height: 20px;
    background-size: cover;
    background-position: center;
  }
`;
export const CategoryCheckboxOption = styled(Checkbox)`
  // 체크'박스' css
  // input 체크 후 hover 시에도 배경, 테두리 유지
  // css 레벨에서 우선순위를 최상위로 높임 : !important
  .ant-checkbox-input:checked + .ant-checkbox-inner {
    background-color: #e61e51 !important;
    border: 1px solid #f0586f !important;
  }
`;
export const InputTextArea = styled.textarea`
  width: 100%;
  height: 350px;
  border: 1px solid #ebebeb;
  border-radius: 20px;
  padding: 20px;
  font-size: 16px;
  /* 사용자가 크기 조절을 못하게 함 */
  resize: none;
  /* 스크롤바 자동 조절 */
  overflow: auto;

  &:focus {
    outline-color: var(--main-color);
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 15px;
  cursor: pointer;

  background-color: var(--main-color);
  color: white;
  transition: background-color 1s;

  &:hover {
    background-color: var(--main-color);
  }
`;

/* 공통 */
export const Loading_div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60vh;
  font-size: 18px;
`;
export const Loading_img = styled.img`
  /* 회전 애니메이션 */
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

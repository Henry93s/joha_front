import styled from "styled-components";
import addImg from "../../assets/icons/addImg.png";

export const Container = styled.div`
  width: 100%;
`;

export const ImageUploadForm = styled.form`
  width: 100%;
  padding-bottom: 40px;
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

export const SubImageUploadLabel = styled.label`
  width: 90%;
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
  width: 92%;
  height: 50px;
  border: 1px solid #ebebeb;
  border-radius: 20px !important;
  padding: 0 20px 0 20px;
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
  width: 90%;
  margin-top: 10px;
  border-bottom: 2px solid #ebebeb;
`;
export const InputDiv = styled.div`
  width: 100%;
  padding-left: 5%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
export const InputTitle = styled.span`
  font-size: 21px;
  font-weight: 500;
`;

export const InputTextArea = styled.textarea`
  width: 95%;
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
  width: 90%;
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

import { useEffect, useState } from "react";
import { myPostUpload } from "../../api/myPostUpload";
import UploadModal from "../layout/UploadModal";
import { useRecoilValue } from "recoil";
import loginState from "../../atoms/loginState";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Container,
  ImageUploadForm,
  ImageUploadLabel,
  SubImageUploadLabel,
  ShortInputText,
  OutlineDiv,
  InputDiv,
  InputTitle,
  InputTextArea,
  SubmitButton,
} from "./StoryStyles";

const Edit = () => {
  const loginUser = useRecoilValue(loginState);
  // 라벨에 넣을 배경 이미지 상태, URL 해제 가 진행되고 나서 loginUser 가 is_logined 인지 판별하도록 하는 state
  const [loginLoad, setLoginLoad] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // loginUser !== null 로 loginUser 가 로드 된 후에 is_logined 를 판별한다.
    /*
    if (loginLoad && !loginUser.is_logined) {
      alert("로그인이 필요한 페이지입니다.");
      navigate("/");
      return;
    }
      */
  }, [loginLoad]);

  // 등록 데이터 state
  const [data, setData] = useState({
    main_image: [],
    sub_images: [],
    title: "",
    contents: "",
  });

  // 첨부된 images 이름 state
  const [imageName, setImageName] = useState({
    main_image: "",
    sub_images: [""],
  });
  // main_image 가 업로드 된 상태, 라벨에 넣을 배경 이미지 상태, URL 해제
  // 라벨에 넣을 배경 이미지 상태, URL 해제 가 진행되고 나서 loginUser 가 is_logined 인지 판별하도록 하는 state
  // 변화도 추가해준다.
  const [isUpload, setIsUpload] = useState(false);
  const [labelBackground, setLabelBackground] = useState("");
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
    return () => {
      setLoginLoad(true);

      if (labelBackground) {
        URL.revokeObjectURL(labelBackground);
      }
    };
  }, [labelBackground]);

  // model 팝업 띄우기 위한 상태
  const [showFinishModal, setshowFinishModal] = useState(false);

  // 스토리 제목 data 반영
  const onChangeTitle = (e) => {
    setData((current) => {
      const newData = { ...current };
      newData.title = e.target.value;
      return newData;
    });
  };

  // 스토리 내용 data 반영
  const onChangeContents = (e) => {
    setData((current) => {
      const newData = { ...current };
      newData.contents = e.target.value;
      return newData;
    });
  };

  // 메인이미지 file input 변경 시 적용
  const onChangeFiles = (e) => {
    // 모든 파일이 이미지 파일이 아닐 때 오류 반환 및 종료
    if (e.target.files && e.target.files.length > 0) {
      const filesNameArray = Array.from(e.target.files);
      const notImages = filesNameArray.filter((v) => {
        if (v && v.name) {
          const extension = v.name.split(".").pop()?.toLowerCase() ?? "";
          return !["jpg", "png", "jpeg", "webp"].includes(extension);
        }
      });
      if (notImages && notImages.length > 0) {
        alert("이미지 파일만(jpg, png, jpeg, webp) 첨부할 수 있습니다.");
        return;
      }
      if (filesNameArray.length > 1) {
        alert("메인 이미지는 한 장만 첨부할 수 있습니다!");
        return;
      }

      setImageName((current) => {
        const newName = { ...current };
        newName.main_image = filesNameArray[0].name;
        return newName;
      });

      // label 배경 입히기 선작업
      setIsUpload(true);
      const labelUrl = URL.createObjectURL(e.target.files[0]);
      setLabelBackground(labelUrl);

      // filesNameArray : 처음에 Array.from(e.target.files); 로 변환한 Filelist
      setData((current) => {
        const newData = { ...current };
        newData.main_image = filesNameArray;
        return newData;
      });
    }
    return;
  };
  // 서브이미지 변경 시 적용
  const onChangeSubFiles = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesNameArray = Array.from(e.target.files);
      const notImages = filesNameArray.filter((v) => {
        if (v && v.name) {
          const extension = v.name.split(".").pop()?.toLowerCase() ?? "";
          return !["jpg", "png", "jpeg", "webp"].includes(extension);
        }
      });
      if (notImages && notImages.length > 0) {
        alert("이미지 파일만(jpg, png, jpeg, webp) 첨부할 수 있습니다.");
        return;
      }
      if (filesNameArray.length >= 5) {
        alert("서브 이미지는 5장 이내로 첨부할 수 있습니다!");
        return;
      }

      setImageName((current) => {
        const newName = { ...current };
        const subImagesNames = filesNameArray.map((v) => v.name);
        newName.sub_images = subImagesNames;
        return newName;
      });

      // filesNameArray : 처음에 Array.from(e.target.files); 로 변환한 Filelist
      setData((current) => {
        const newData = { ...current };
        newData.sub_images = filesNameArray;
        return newData;
      });
    }
    return;
  };
  // input 필드 벗어날 때 input value 교체
  const onBlurPrice = (e) => {
    e.target.value = data.price.toString();
  };

  // 등록 하기 !
  // form submit 시 formData 생성해서 formData에 입력 정보를 대입 후 백엔드로 전송 및 응답 요청
  const onSubmitPost = async (e) => {
    e.preventDefault();

    const subImagesArray = Array.from(data.sub_images);
    const mainImageArray = Array.from(data.main_image);
    // 파일 이름에 공백이 포함되어 있는지 확인
    if (
      subImagesArray.some((file) => file.name.includes(" ")) ||
      mainImageArray.some((file) => file.name.includes(" "))
    ) {
      alert("이미지 파일 이름에 공백은 포함될 수 없습니다.");
      return;
    }
    // 파일 이름 길이가 20자를 초과하는지 확인
    if (
      subImagesArray.some((file) => file.name.length > 20) ||
      mainImageArray.some((file) => file.name.length > 20)
    ) {
      alert("이미지 파일 이름은 20자 이내여야 합니다.");
      return;
    }
    // 유니코드 + 한글 + 특수 문자가 포함되어 있는지 검사하는 정규 표현식
    const unsafePattern = /[<>:"/\\|?*\u007F-\uFFFF]/;
    // 유니코드 + 한글 + 특수 문자가 포함되어 있는지 검사
    let hasUnsafeCharacters = false;
    for (const v of subImagesArray) {
      if (unsafePattern.test(v.name)) {
        hasUnsafeCharacters = true;
        break;
      }
    }
    if (!hasUnsafeCharacters) {
      for (const v of mainImageArray) {
        if (unsafePattern.test(v.name)) {
          hasUnsafeCharacters = true;
          break;
        }
      }
    }
    if (hasUnsafeCharacters) {
      alert("파일 이름에 유니코드 + 한글 + 특수 문자가 포함되어 있습니다.");
      return;
    }

    if (!data.main_image || !data.title || !data.contents) {
      alert("입력이 누락되거나 잘못된 항목을 확인해주세요.");
      return;
    }
    // 카테고리가 없을 때는 서버에서 판단하여 "전체" 로 넣어줌

    // formdata 생성 및 데이터 추가
    const formData = new FormData();
    // 파일들을 'images'라는 필드 이름으로 추가 (서버에는 images 에 main 첫번째 나머지 subimage로 들어가야 함)
    // 백엔드에서 main_image <-> sub_images 분리시킴
    formData.append("images", data.main_image[0]);
    for (let i = 0; i < data.sub_images.length; i++) {
      formData.append("images", data.sub_images[i]);
    }
    formData.append("title", data.title);
    formData.append("contents", data.contents);

    myPostUpload(formData)
      .then((res) => {
        if (res && res.data && res.data.code === 200) {
          // 성공 모달 창을 띄우며 메인 페이지로 이동(모달 및 메인 페이지 이동은 ~Modal 컴포넌트 활용)
          setshowFinishModal(true);
        } else {
          if (res) {
            alert(res?.data?.message);
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  console.log(data, imageName);

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, transform: "translateX(100%)" }}
        animate={{ opacity: 1, transform: "translateX(0)" }}
        transition={{ duration: 0.3 }}
      >
        <ImageUploadForm onSubmit={onSubmitPost}>
          <ImageUploadLabel
            htmlFor="inputFileOne"
            $isUpload={isUpload}
            $newImg={labelBackground}
          ></ImageUploadLabel>
          <input
            type="file"
            id="inputFileOne"
            style={{ display: "none" }}
            onChange={onChangeFiles}
          />
          <ShortInputText
            placeholder="대표 이미지를 첨부해주세요."
            value={imageName.main_image}
            disabled
          />
          <OutlineDiv />
          <SubImageUploadLabel htmlFor="inputFiles">
            추가 이미지 등록
          </SubImageUploadLabel>
          <input
            type="file"
            id="inputFiles"
            style={{ display: "none" }}
            multiple
            onChange={onChangeSubFiles}
          />
          <ShortInputText
            placeholder="추가 이미지를 첨부해주세요. 최대 4장"
            value={imageName.sub_images}
            disabled
          />
          <OutlineDiv />
          <InputDiv>
            <InputTitle>스토리 이름</InputTitle>
            <ShortInputText
              onChange={onChangeTitle}
              maxLength={20}
              placeholder="스토리 이름을 작성해주세요. (최대 20자 이내)"
            />
          </InputDiv>
          <OutlineDiv />
          <InputDiv>
            <InputTitle>스토리 내용</InputTitle>
            <InputTextArea
              onChange={onChangeContents}
              maxLength={1000}
              placeholder="내용 텍스트 (1000자)"
            />
          </InputDiv>
          <OutlineDiv />
          <SubmitButton>등록</SubmitButton>
        </ImageUploadForm>
      </motion.div>
      {showFinishModal && (
        <UploadModal
          message="스토리 등록이 완료되었습니다 !"
          onClose={() => setshowFinishModal(false)}
        />
      )}
    </Container>
  );
};

export default Edit;

import React, { useEffect, useRef, useState } from "react";
import Select, { SingleValue, StylesConfig } from "react-select";
import { myPostEdit } from "../../api/myPostEdit";
import MyClassModal from "../../components/myClass/MyClassModal";
import { useRecoilValue } from "recoil";
// import loginState from "../atoms/loginState";
import { useLocation, useNavigate } from "react-router-dom";
import { detailPost } from "../../api/detailPost";
import { motion } from "framer-motion";
import {
  UploadContainer as Container,
  ImageUploadForm,
  ImageUploadLabel,
  MainImageSpan,
  SubImageUploadLabel,
  ShortInputText,
  OutlineDiv,
  InputDiv,
  InputTitle,
  InputSubTitle,
  CheckboxDiv,
  selectCustom,
  CategoryCheckbox,
  CategoryCheckboxOption,
  InputTextArea,
  SubmitButton,
} from "./ClassStyles";

const PostUploadEdit = () => {
  //const loginUser = useRecoilValue(loginState);
  const loginUser = localStorage.getItem("is_logined") === "true";
  const navigate = useNavigate();
  const location = useLocation();
  const nanoid = location.state.v;
  // 수정 전 상태 정의
  // 등록 데이터 state
  const [data, setData] = useState({
    main_image: [],
    sub_images: [],
    title: "",
    room_num: 0,
    max_adult: 1,
    max_child: 0,
    max_baby: 0,
    price: 0,
    main_location: "",
    sub_location: "",
    contents: "",
    category: [""],
    host_intro: "",
  });

  // 첨부된 images 이름 state
  const [imageName, setImageName] = useState({
    main_image: "",
    sub_images: [""],
  });
  // main_image 가 업로드 된 상태, 라벨에 넣을 배경 이미지 상태, URL 해제
  const [isUpload, setIsUpload] = useState(false);
  const [labelBackground, setLabelBackground] = useState("");
  useEffect(() => {
    return () => {
      if (labelBackground) {
        URL.revokeObjectURL(labelBackground);
      }
    };
  }, [labelBackground]);

  // model 팝업 띄우기 위한 상태
  const [showFinishModal, setshowFinishModal] = useState(false);

  useEffect(() => {
    if (!loginUser.is_logined) {
      alert("수정 중에 새로고침됐거나, 로그인하지 않은 사용자입니다.");
      navigate("/");
      return;
    }

    detailPost({ nanoid })
      .then((res) => {
        if (res && res.data && res.data.code === 200) {
          const saveData = res.data.data;
          setData((current) => {
            const newData = { ...current };
            newData.title = saveData.title;
            newData.main_location = saveData.main_location;
            newData.sub_location = saveData.sub_location;
            newData.contents = saveData.contents;
            newData.host_intro = saveData.host_intro;
            return newData;
          });
          return;
        } else {
          alert(res?.data.message);
          navigate("/");
          return;
        }
      })
      .catch((e) => {
        console.log(e);
        navigate("/");
        return;
      });
  }, []);
  console.log(data);

  // 숙소 이름 data 반영
  const onChangeTitle = (e) => {
    setData((current) => {
      const newData = { ...current };
      newData.title = e.target.value;
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

  // 숙소 소개 data 상태 반영
  const onChangeContents = (e) => {
    setData((current) => {
      const newData = { ...current };
      newData.contents = e.target.value;
      return newData;
    });
  };

  // 숙소 주요 위치 option 및 data 상태 반영
  const onChangeMainLocation = (e) => {
    if (e) {
      setData((current) => {
        const newData = { ...current };
        newData.main_location = e.value;
        return newData;
      });
    }
  };

  // 숙소 상세 주소 data 상태 반영
  // 다음 주소 api load 와 컴포넌트 언마운트 시 정리 작업
  const onClickSubLocation = () => {
    // 스크립트 동적 로드
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);

    // 스크립트 로드 후 실행 함수
    script.onload = () => {
      if (window.daum) {
        window.daum.postcode.load(() => {
          new window.daum.Postcode({
            oncomplete: function (data) {
              // 주소를 선택했을 때 호출 함수
              setData((current) => {
                const newData = { ...current };
                newData.sub_location = data.address;
                return newData;
              });
            },
          }).open(
            // 팝업 위치를 모니터 기준 중간 정도로 지정한다.(https://postcode.map.daum.net/guide 참고함)
            {
              left: window.screen.width / 2,
              top: window.screen.height / 2,
            }
          );
        });
      }
    };
    return () => {
      document.body.removeChild(script);
    };
  };

  // 숙소 가격 입력 data 반영 전 유효성 검사(1000 단위 검사)
  // 1. 입력한 문자에서 숫자만 추출
  // 2. 끝 자리 자동으로 1000 단위로 강제 변경
  // 3. 수정된 string은 숫자로 변경 후 data 반영
  const onChangePrice = (e) => {
    // 1. 입력한 문자에서 숫자만 추출
    const inputPrice = e.target.value.replace(/[^0-9]/g, "").toString();
    if (inputPrice.length >= 4) {
      // 2. 끝 자리 자동으로 1000 단위로 강제 변경
      const convert1000EndPrice = "000";
      const remain1000Price = inputPrice.slice(0, inputPrice.length - 3);
      const returnDataPrice = `${remain1000Price}${convert1000EndPrice}`;

      // 5 억 이상일 경우 차단
      if (Number(returnDataPrice) >= 500000000) {
        alert("5억 원 이상으로 설정은 불가합니다.");
        return;
      }

      // 3. 수정된 string은 숫자로 변경 후 data 반영
      setData((current) => {
        const newData = { ...current };
        newData.price = Number(returnDataPrice);
        return newData;
      });

      e.target.value = e.target.value.replace(/[^0-9]/g, "").toString();
    }
  };
  // input 필드 벗어날 때 input value 교체
  const onBlurPrice = (e) => {
    e.target.value = data.price.toString();
  };

  // 호스트 소개 data 반영
  const onChangeHostIntro = (e) => {
    setData((current) => {
      const newData = { ...current };
      newData.host_intro = e.target.value;
      return newData;
    });
  };

  // 등록 하기 !
  // form submit 시 formData 생성해서 formData에 입력 정보를 대입 후 백엔드로 전송 및 응답 요청
  const onSubmitPost = async (e) => {
    e.preventDefault();

    // 메인 이미지 수정 시 체크
    if (data.main_image.length !== 0) {
      const mainImageArray = Array.from(data.main_image);
      if (mainImageArray.some((file) => file.name.includes(" "))) {
        alert("이미지 파일 이름에 공백은 포함될 수 없습니다.");
        return;
      }
      // 파일 이름 길이가 20자를 초과하는지 확인
      if (mainImageArray.some((file) => file.name.length > 20)) {
        alert("이미지 파일 이름은 20자 이내여야 합니다.");
        return;
      }
      // 유니코드 + 한글 + 특수 문자가 포함되어 있는지 검사하는 정규 표현식
      const unsafePattern = /[<>:"/\\|?*\u007F-\uFFFF]/;
      // 유니코드 + 한글 + 특수 문자가 포함되어 있는지 검사
      let hasUnsafeCharacters = false;
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
    }

    // 서브 이미지 수정 시 체크
    if (data.sub_images.length > 0) {
      const subImagesArray = Array.from(data.sub_images);
      // 파일 이름에 공백이 포함되어 있는지 확인
      if (subImagesArray.some((file) => file.name.includes(" "))) {
        alert("이미지 파일 이름에 공백은 포함될 수 없습니다.");
        return;
      }
      // 파일 이름 길이가 20자를 초과하는지 확인
      if (subImagesArray.some((file) => file.name.length > 20)) {
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
      if (hasUnsafeCharacters) {
        alert("파일 이름에 유니코드 + 한글 + 특수 문자가 포함되어 있습니다.");
        return;
      }
    }

    if (
      !data.title ||
      data.price < 1000 ||
      !data.main_location ||
      !data.sub_location ||
      !data.contents ||
      !data.host_intro
    ) {
      alert("입력이 누락되거나 잘못된 항목을 확인해주세요.");
      return;
    }
    // 카테고리가 없을 때는 서버에서 판단하여 "전체" 로 넣어줌

    // formdata 생성 및 데이터 추가
    const formData = new FormData();
    // 파일들을 'images'라는 필드 이름으로 추가 (서버에는 images 에 main 첫번째 나머지 subimage로 들어가야 함)
    // 백엔드에서 main_image <-> sub_images 분리시킴
    if (data.main_image.length > 0) {
      formData.append("images", data.main_image[0]);
    }
    if (data.sub_images.length > 0) {
      for (let i = 0; i < data.sub_images.length; i++) {
        formData.append("images", data.sub_images[i]);
      }
    }
    if (
      data.category &&
      data.category[0] !== "전체" &&
      data.category.length > 0
    ) {
      for (let k = 0; k < data.category.length; k++) {
        formData.append("category", data.category[k]);
      }
    } else {
      // category 가 없을 시 서버에서 length 확인 후 "전체" 로 삽입
      formData.append("category", "");
    }
    formData.append("title", data.title);
    formData.append("max_adult", String(data.max_adult));
    formData.append("max_child", String(data.max_child));
    formData.append("max_baby", String(data.max_baby));
    formData.append("price", String(data.price));
    formData.append("main_location", data.main_location);
    formData.append("sub_location", data.sub_location);
    formData.append("contents", data.contents);
    formData.append("room_num", String(data.room_num));
    formData.append("host_intro", data.host_intro);

    // mode 값이 추가로 담겨져야 함!!!(1: 메인 이미지, 2: 서브, 3: 둘 다 교체, 0. 교체 안함)
    let mode;
    if (data.main_image.length > 0 && data.sub_images.length > 0) {
      mode = 3;
    } else if (data.main_image.length > 0) {
      mode = 1;
    } else if (data.sub_images.length > 0) {
      mode = 2;
    } else {
      mode = 0;
    }

    formData.append("nanoid", nanoid);
    formData.append("mode", mode.toString());

    myPostEdit(formData)
      .then((res) => {
        if (res && res.data && res.data.code === 200) {
          // 성공 모달 창을 띄우며 나의 숙소 페이지로 이동(모달 및 메인 페이지 이동은 ~Modal 컴포넌트 활용)
          setshowFinishModal(true);
        } else {
          alert(res?.data?.message);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

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
          >
            <MainImageSpan $isUpload={isUpload}>
              숙소 대표 이미지를 변경해보세요 !
            </MainImageSpan>
          </ImageUploadLabel>
          <input
            type="file"
            id="inputFileOne"
            style={{ display: "none" }}
            onChange={onChangeFiles}
          />
          <ShortInputText
            placeholder="첨부하지 않을 시 기존 이미지가 유지됩니다."
            value={imageName.main_image}
            disabled
          />
          <OutlineDiv />
          <SubImageUploadLabel htmlFor="inputFiles">
            추가 숙소 이미지 변경
          </SubImageUploadLabel>
          <input
            type="file"
            id="inputFiles"
            style={{ display: "none" }}
            multiple
            onChange={onChangeSubFiles}
          />
          <ShortInputText
            placeholder="첨부하지 않을 시 기존 이미지가 유지됩니다. 최대 4장"
            value={imageName.sub_images}
            disabled
          />
          <OutlineDiv />
          <InputDiv>
            <InputTitle>숙소 이름</InputTitle>
            <ShortInputText
              value={data.title}
              onChange={onChangeTitle}
              maxLength={20}
              placeholder="숙소 이름을 작성해주세요. 20자 이내"
            />
          </InputDiv>
          <OutlineDiv />
          <OutlineDiv />
          <InputDiv>
            <InputTitle>숙소 소개</InputTitle>
            <InputTextArea
              value={data.contents}
              onChange={onChangeContents}
              maxLength={1000}
              placeholder="숙소를 자세히 소개해주세요! (1000자)"
            />
          </InputDiv>
          <OutlineDiv />
          <InputDiv>
            <InputTitle>숙소 위치</InputTitle>
            <InputSubTitle>상세 위치</InputSubTitle>
            {/* 커서 투명화 css 추가 */}
            <ShortInputText
              id="inputSubLocation"
              placeholder="상세 주소를 입력해주세요."
              onClick={onClickSubLocation}
              value={data.sub_location}
              style={{ caretColor: "transparent" }}
              readOnly
            />
          </InputDiv>
          <OutlineDiv />
          <InputDiv>
            <InputTitle>레슨 가격 (1회)</InputTitle>
            <InputSubTitle>1박 가격</InputSubTitle>
            <ShortInputText
              type="number"
              value={data.price}
              placeholder="1,000원 단위로 숫자만 입력됩니다."
              onChange={onChangePrice}
              onBlur={onBlurPrice}
            />
          </InputDiv>
          <OutlineDiv />
          <InputDiv>
            <InputTitle>강사 소개</InputTitle>
            <InputTextArea
              maxLength={500}
              value={data.host_intro}
              onChange={onChangeHostIntro}
            />
          </InputDiv>
          <OutlineDiv />
          <SubmitButton>등록</SubmitButton>
        </ImageUploadForm>
      </motion.div>
      {showFinishModal && (
        <MyClassModal
          message="숙소 수정이 완료되었습니다 !"
          onClose={() => setshowFinishModal(false)}
        />
      )}
    </Container>
  );
};

export default PostUploadEdit;

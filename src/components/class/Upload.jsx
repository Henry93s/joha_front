import React, { useEffect, useRef, useState } from "react";
import Select, { SingleValue, StylesConfig } from "react-select";
import { myPostUpload } from "../../api/myPostUpload";
import UploadModal from "../layout/UploadModal";
import { useRecoilValue } from "recoil";
import loginState from "../../atoms/loginState";
import { Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import loading from "../../assets/icons/loading.png";
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
  smallSelectCustom,
  CategoryCheckbox,
  CategoryCheckboxOption,
  InputTextArea,
  SubmitButton,
  Loading_div,
  Loading_img,
} from "./ClassStyles";

const ClassUpload = () => {
  //const loginUser = useRecoilValue(loginState);
  const loginUser = localStorage.getItem("is_logined") === "true";
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
    price: 0, // number
    main_available_time: "",
    sub_available_times: [],
    main_location: "",
    sub_location: "",
    duration_time: 0,
    contents: "",
    introduce: "",
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
  // is loading
  const [is_Loading, set_IsLoading] = useState(false);

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

  useEffect(() => {
    if (is_Loading) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [is_Loading]);

  // model 팝업 띄우기 위한 상태
  const [showFinishModal, setshowFinishModal] = useState(false);

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

  // 인풋 입력값 상태에 반영
  const onChangeInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((current) => {
      const newData = { ...current };
      newData[name] = value;
      return newData;
    });
  };

  // 수업 상세 주소 data 상태 반영
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
                newData.main_location = data.address;
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

  // 수업 가격 입력 data 반영 전 유효성 검사(1000 단위 검사)
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

  const scheduleSelectOptions = [
    { value: "once", label: "일회성" },
    { value: "regularity", label: "주기성" },
    { value: "all", label: "모두" },
  ];
  const scheduleSelectOptions2 = [
    { value: "morning", label: "오전 (06:00 ~ 11:59)" },
    { value: "afternoon", label: "오후 (12:00 ~ 17:59)" },
    { value: "evening", label: "저녁 (18:00 ~ 23:59)" },
  ];
  const [selectedDate, setSelectedDate] = useState(""); // 선택 날짜 저장
  // 요일 체크박스
  const [checkedDay, setCheckedDay] = useState({
    everyday: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });

  const durationOptions = [
    { label: "1시간", value: 1 },
    { label: "2시간", value: 2 },
    { label: "3시간", value: 3 },
    { label: "5시간", value: 5 },
    { label: "6시간", value: 6 },
  ];

  const onChangeSchedule = (option) => {
    const value = option.value;
    setData((current) => {
      const newData = { ...current };
      newData.main_available_time = value;
      return newData;
    });
  };

  // 날짜 체크박스 이벤트
  const CheckChangeHandler = (e) => {
    const { id, checked } = e.target;
    if (id === "everyday" && checked) {
      setCheckedDay({
        everyday: true,
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true,
      });
    } else {
      if (id === "everyday") {
        setCheckedDay({
          everyday: false,
          monday: false,
          tuesday: false,
          wednesday: false,
          thursday: false,
          friday: false,
          saturday: false,
          sunday: false,
        });
      } else {
        setCheckedDay((prev) => ({ ...prev, [id]: checked, everyday: false }));
      }
    }
  };

  useEffect(() => {
    // 레슨 가능 요일, 시간 상태 저장
    const checkdDayArr = Object.entries(checkedDay);
    const newCheckedArr = checkdDayArr.filter((el) => el[1]).map((el) => el[0]);
    const checkedDayString = newCheckedArr.join(" ");
    setData((current) => {
      const newData = { ...current };
      newData.sub_available_times[0] = checkedDayString;
      return newData;
    });
  }, [checkedDay]);

  const onChangeTime = (option) => {
    const value = option.value;
    setData((current) => {
      const newData = { ...current };
      newData.sub_available_times[1] = value;
      return newData;
    });
  };

  const onChangeDurationTime = (option) => {
    const value = option.value;
    console.log(value);
    setData((current) => {
      const newData = { ...current };
      newData.duration_time = value;
      return newData;
    });
  };

  // 등록 하기 !
  // form submit 시 formData 생성해서 formData에 입력 정보를 대입 후 백엔드로 전송 및 응답 요청
  const onSubmitPost = async (e) => {
    e.preventDefault();
    set_IsLoading(true);

    const subImagesArray = Array.from(data.sub_images);
    const mainImageArray = Array.from(data.main_image);
    // 파일 이름에 공백이 포함되어 있는지 확인
    if (
      subImagesArray.some((file) => file.name.includes(" ")) ||
      mainImageArray.some((file) => file.name.includes(" "))
    ) {
      set_IsLoading(false);
      alert("이미지 파일 이름에 공백은 포함될 수 없습니다.");
      return;
    }
    // 파일 이름 길이가 20자를 초과하는지 확인
    if (
      subImagesArray.some((file) => file.name.length > 20) ||
      mainImageArray.some((file) => file.name.length > 20)
    ) {
      set_IsLoading(false);
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
      set_IsLoading(false);
      alert("파일 이름에 유니코드 + 한글 + 특수 문자가 포함되어 있습니다.");
      return;
    }

    console.log(data);

    // input 값 입력 여부 확인
    if (
      !data.main_image ||
      !data.title ||
      !data.main_available_time ||
      !data.sub_available_times ||
      !data.duration_time ||
      data.price < 1000 ||
      !data.main_location ||
      !data.contents ||
      !data.introduce
    ) {
      set_IsLoading(false);
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
    formData.append("main_available_time", data.main_available_time);
    formData.append("sub_available_times", data.sub_available_times);
    formData.append("main_location", data.main_location);
    formData.append("sub_location", data.sub_location);
    formData.append("duration_time", Number(data.duration_time));
    formData.append("contents", data.contents);
    formData.append("introduce", data.introduce);
    formData.append("price", String(data.price));

    myPostUpload(formData)
      .then((res) => {
        if (res && res.data && res.data.code === 200) {
          set_IsLoading(false);
          // 성공 모달 창을 띄우며 메인 페이지로 이동(모달 및 메인 페이지 이동은 ~Modal 컴포넌트 활용)
          setshowFinishModal(true);
        } else {
          set_IsLoading(false);
          if (res) {
            alert(res?.data?.message);
          }
        }
      })
      .catch((e) => {
        set_IsLoading(false);
        console.log(e);
      });
  };

  return (
    <Container>
      {(!is_Loading && (
        <>
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
                  수업 대표 이미지를 추가하세요 !
                </MainImageSpan>
              </ImageUploadLabel>
              <input
                type="file"
                id="inputFileOne"
                style={{ display: "none" }}
                onChange={onChangeFiles}
              />
              <InputDiv>
                <ShortInputText
                  placeholder="대표 이미지를 첨부해주세요."
                  value={imageName.main_image}
                  disabled
                />
              </InputDiv>
              <OutlineDiv />

              <SubImageUploadLabel htmlFor="inputFiles">
                추가 수업 이미지 등록
              </SubImageUploadLabel>
              <input
                type="file"
                id="inputFiles"
                style={{ display: "none" }}
                multiple
                onChange={onChangeSubFiles}
              />
              <InputDiv>
                <ShortInputText
                  placeholder="추가 이미지를 첨부해주세요. 최대 4장"
                  value={imageName.sub_images}
                  disabled
                />
              </InputDiv>
              <OutlineDiv />
              <InputDiv>
                <InputTitle>레슨 이름</InputTitle>
                <ShortInputText
                  name="title"
                  onChange={onChangeInput}
                  maxLength={20}
                  placeholder="레슨 이름을 작성해주세요. 20자 이내"
                />
              </InputDiv>
              <OutlineDiv />
              <InputDiv>
                <InputTitle>레슨 가능 일정</InputTitle>
                <Select
                  onChange={onChangeSchedule}
                  options={scheduleSelectOptions}
                  placeholder="일회성 / 주기성 / 모두 가능"
                  styles={selectCustom}
                />

                <CheckboxDiv>
                  <div>
                    <label htmlFor="everyday">매일</label>
                    <input
                      type="checkbox"
                      name="day"
                      id="everyday"
                      checked={checkedDay.everyday}
                      onChange={CheckChangeHandler}
                    />
                  </div>
                  <div>
                    <label htmlFor="monday">월</label>
                    <input
                      type="checkbox"
                      name="day"
                      id="monday"
                      checked={checkedDay.monday}
                      onChange={CheckChangeHandler}
                    />
                  </div>
                  <div>
                    <label htmlFor="tuesday">화</label>
                    <input
                      type="checkbox"
                      name="day"
                      id="tuesday"
                      checked={checkedDay.tuesday}
                      onChange={CheckChangeHandler}
                    />
                  </div>
                  <div>
                    <label htmlFor="wednesday">수</label>
                    <input
                      type="checkbox"
                      name="day"
                      id="wednesday"
                      checked={checkedDay.wednesday}
                      onChange={CheckChangeHandler}
                    />
                  </div>
                  <div>
                    <label htmlFor="thursday">목</label>
                    <input
                      type="checkbox"
                      name="day"
                      id="thursday"
                      checked={checkedDay.thursday}
                      onChange={CheckChangeHandler}
                    />
                  </div>
                  <div>
                    <label htmlFor="friday">금</label>
                    <input
                      type="checkbox"
                      name="day"
                      id="friday"
                      checked={checkedDay.friday}
                      onChange={CheckChangeHandler}
                    />
                  </div>
                  <div>
                    <label htmlFor="saturday">토</label>
                    <input
                      type="checkbox"
                      name="day"
                      id="saturday"
                      checked={checkedDay.saturday}
                      onChange={CheckChangeHandler}
                    />
                  </div>
                  <div>
                    <label htmlFor="sunday">일</label>
                    <input
                      type="checkbox"
                      name="day"
                      id="sunday"
                      checked={checkedDay.sunday}
                      onChange={CheckChangeHandler}
                    />
                  </div>
                </CheckboxDiv>
                <Select
                  options={scheduleSelectOptions2}
                  placeholder="시간대 선택"
                  styles={selectCustom}
                  onChange={onChangeTime}
                />
              </InputDiv>
              <OutlineDiv />
              <InputDiv>
                <InputTitle>레슨 소개</InputTitle>
                <InputTextArea
                  name="contents"
                  onChange={onChangeInput}
                  maxLength={1000}
                  placeholder="레슨을 자세히 소개해주세요! (1000자)"
                />
              </InputDiv>
              <OutlineDiv />
              <InputDiv>
                <InputTitle>레슨 위치</InputTitle>
                <InputSubTitle>기본 주소</InputSubTitle>
                {/* 커서 투명화 css 추가 */}
                <ShortInputText
                  id="inputMainLocation"
                  placeholder="기본 주소를 입력해주세요."
                  onClick={onClickSubLocation}
                  value={data.main_location}
                  style={{ caretColor: "transparent" }}
                  readOnly
                />
                <InputSubTitle>상세 주소</InputSubTitle>
                <ShortInputText
                  id="inputSubLocation"
                  name="sub_location"
                  placeholder="상세 주소를 입력해주세요."
                  onChange={onChangeInput}
                />
              </InputDiv>
              <OutlineDiv />
              <InputDiv>
                <InputTitle>
                  레슨 가격 (1회)
                  <div>
                    <Select
                      options={durationOptions}
                      placeholder="시간 선택"
                      styles={smallSelectCustom}
                      onChange={onChangeDurationTime}
                    />
                  </div>
                </InputTitle>
                <ShortInputText
                  type="number"
                  placeholder="1,000원 단위로 숫자만 입력됩니다."
                  onChange={onChangePrice}
                  onBlur={onBlurPrice}
                />
              </InputDiv>
              <OutlineDiv />
              <InputDiv>
                <InputTitle>강사 소개</InputTitle>
                <InputTextArea
                  name="introduce"
                  onChange={onChangeInput}
                  maxLength={500}
                  placeholder="강사님에 대해 소개해 주세요. 500자 이내"
                />
              </InputDiv>
              <OutlineDiv />
              <InputDiv>
                <SubmitButton>등록</SubmitButton>
              </InputDiv>
            </ImageUploadForm>
          </motion.div>
          {showFinishModal && (
            <UploadModal
              message="레슨 등록이 완료되었습니다 !"
              onClose={() => setshowFinishModal(false)}
            />
          )}
        </>
      )) || (
        <Loading_div>
          <Loading_img
            src={loading}
            style={{ animation: "spin 0.5s 60 linear" }}
          />
        </Loading_div>
      )}
    </Container>
  );
};

export default ClassUpload;

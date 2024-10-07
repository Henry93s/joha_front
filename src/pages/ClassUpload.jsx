import React, { useEffect, useRef, useState } from "react";
import SubHeader from "../components/layout/Header";
import Footer from "../components/layout/FooterMenu";
import styled from "styled-components";
import addImg from '../assets/icons/addImg.png';
import Select, { SingleValue, StylesConfig } from 'react-select';
import {Checkbox} from 'antd';
import { myPostUpload } from "../api/myPostUpload";
import UploadModal from "../components/layout/UploadModal";
import { useRecoilValue } from "recoil";
import loginState from "../atoms/loginState";
import { Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import loading from '../assets/icons/loading.png';

const Container = styled.div`
    width: 100%;
`

const ImageUploadForm = styled.form`
    width: 100%;
    height: 2900px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`
// input element 를 숨기고 label 로 대신 기능을 받음 (id <=> for)
// 파일 선택, 선택된 파일 없음 숨기기 위함
const ImageUploadLabel = styled.label.attrs(props => ({
    style: {
        backgroundImage: props.$isUpload === true ? `url(${props.$newImg})` : `url(${addImg})`,
        backgroundSize: props.$isUpload === true ? "cover" : "auto",
        cursor: props.$isUpload === true ? "none" : "pointer",
    }
}))`
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;

    background-color:#D9D9D9;
    background-position: center;
    background-repeat: no-repeat;

    position: relative;
`
const MainImageSpan = styled.span.attrs(props => ({
    style: {
        display: props.$isUpload === true ? "none" : "block"
    }
}))`
    position: absolute;
    margin-top: 200px;
    color: #E61E51;
    opacity: 0.6;
    font-size: 22px;
    font-weight: bold;
`
const SubImageUploadLabel = styled.label`
    width: 90%;
    height: 50px;
    border: none;
    border-radius: 10px;
    font-size: 15px;
    background-color: #f87878;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 1s;

    &:hover{
        background-color: #F0586F;
    }

    &:focus {
        outline: none;
    }
`

const ShortInputText = styled.input`
    width: 92%;
    height: 50px;
    border: 1px solid #EBEBEB;
    border-radius: 20px;
    padding: 0 20px 0 20px;
    font-size: 16px;
    // 텍스트가 input 길이 초과 시 숨기기 / 줄바꿈을 사용 안 함 / ... 표시
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    &:focus{
        outline-color: #f87878;
    }
`
const OutlineDiv = styled.div`
    width: 90%;
    margin-top: 10px;
    border-bottom: 2px solid #EBEBEB;
`
const InputDiv = styled.div`
    width: 100%;
    padding-left: 5%;
    display: flex;
    flex-direction: column;
    gap: 12px;
`
const InputTitle = styled.span`
    font-size: 21px;
    font-weight: 500;
`
const InputSubTitle = styled.span`
    font-size: 16px;
    font-weight: 400;
`

// react-select css
const selectCustom = {
    option: (provided, state) => {
        let backgroundColor = 'white';
        let color = '#333';
        if(state.isSelected){
            backgroundColor = '#F0586F';
            color = 'white';
        } else if(state.isFocused){
            backgroundColor = '#F07C8C';
            color = 'white';
        }
    return {
      ...provided,
      backgroundColor,
      color,
      padding: 20,
      borderRadius: "5px",
      fontSize: "16px"
    }},
    control: (provided) => ({
      ...provided,
      border: "1px solid #EBEBEB",
      borderRadius: "10px",
      boxShadow: 'none',
      width: "95%",
      fontSize: "16px"
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "10px",
      width: "90%",
      fontSize: "16px"
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#333',
      fontSize: "16px"
    }),
};

// antd 체크박스 그룹 css style 정의
const CategoryCheckbox = styled(Checkbox.Group)`
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
`
const CategoryCheckboxOption = styled(Checkbox)`
    // 체크'박스' css 
    // input 체크 후 hover 시에도 배경, 테두리 유지
    // css 레벨에서 우선순위를 최상위로 높임 : !important
    .ant-checkbox-input:checked + .ant-checkbox-inner {
        background-color: #E61E51 !important;
        border: 1px solid #F0586F !important;
    }
`
const InputTextArea = styled.textarea`
    width: 95%;
    height: 350px;
    border: 1px solid #EBEBEB;
    border-radius: 20px;
    padding: 20px;
    font-size: 16px;
    /* 사용자가 크기 조절을 못하게 함 */
    resize: none; 
    /* 스크롤바 자동 조절 */
    overflow: auto; 
    
    &:focus{
        outline-color: #f87878;
    }
`

const SubmitButton = styled.button`
    width: 90%;
    height: 50px;
    border: none;
    border-radius: 15px;
    cursor: pointer;

    background-color: #f87878;
    color: white;
    transition: background-color 1s;

    &:hover{
        background-color: #F0586F;
    }
`

const Loading_div = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Loading_img = styled.img`
    /* 회전 애니메이션 */
    @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
    }
`

const ClassUpload = () => {
    const loginUser = useRecoilValue(loginState);
    // 라벨에 넣을 배경 이미지 상태, URL 해제 가 진행되고 나서 loginUser 가 is_logined 인지 판별하도록 하는 state
    const [loginLoad, setLoginLoad] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        // loginUser !== null 로 loginUser 가 로드 된 후에 is_logined 를 판별한다.
        if(loginLoad && !loginUser.is_logined){
          alert('로그인이 필요한 페이지입니다.');
          navigate('/');
          return;
        }
      },[loginLoad])

    // 등록 데이터 state
    const [data, setData] = useState({
        main_image: [],
        sub_images: [],
        title: "",
        room_num: 1, // number
        max_adult: 1, // number
        max_child: 0, // number
        max_baby: 0, // number
        price: 1000, // number
        main_location: "서울",
        sub_location: "",
        contents: "",
        category: [], // [string]
        host_intro: ""
    }); 
    
    // 첨부된 images 이름 state
    const [imageName, setImageName] = useState({
        main_image: "",
        sub_images: [""]
    });
    // main_image 가 업로드 된 상태, 라벨에 넣을 배경 이미지 상태, URL 해제
    // 라벨에 넣을 배경 이미지 상태, URL 해제 가 진행되고 나서 loginUser 가 is_logined 인지 판별하도록 하는 state
    // 변화도 추가해준다.
    const [isUpload, setIsUpload] = useState(false);
    const [labelBackground, setLabelBackground] = useState('');
    // is loading
    const [is_Loading, set_IsLoading] = useState(false);

    useEffect(() => {
        window.scrollTo({
            top: 0
        });
        return () => {
            setLoginLoad(true);
            
            if(labelBackground){
                URL.revokeObjectURL(labelBackground);
            }
        };
    }, [labelBackground]);
    
    useEffect(() => {
        if(is_Loading){
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    },[is_Loading])


    // 방 갯수 state
    // 방 갯수 옵션 상태 정의
    
    const [optionRoom, setOptionRoom] = useState({value: "c", label: "l"});

    // 어른/어린이/아기 state
    // 인원 수 옵션 상태 정의
    
    const [optionPerson, setOptionPerson] = useState({value: "c", label: "l"});
    const [optionChild, setOptionChild] = useState({value: "c", label: "l"});
    const [optionBaby, setOptionBaby] = useState({value: "c", label: "l"});

    // 주요 행정구역 옵션 상태 정의
    const optionsMainLocation = mainLocationArr.map((v) => {
        return {value: v, label: v};
    });
    const [optionMainLocation, setoptionMainLocation] = useState(optionsMainLocation[0]);

    // model 팝업 띄우기 위한 상태
    const [showFinishModal, setshowFinishModal] = useState(false);

    // 수업 이름 data 반영
    const onChangeTitle = (e) => {
        setData((current) => {
            const newData = {...current};
            newData.title = e.target.value;
            return newData;
        });
    };

    // 메인이미지 file input 변경 시 적용
    const onChangeFiles = (e) => {
        // 모든 파일이 이미지 파일이 아닐 때 오류 반환 및 종료
        if(e.target.files && e.target.files.length > 0){
            const filesNameArray = Array.from(e.target.files);
            const notImages = filesNameArray.filter(
                v  => {
                    if(v && v.name){
                        const extension = v.name.split('.').pop()?.toLowerCase() ?? '';
                        return !['jpg', 'png', 'jpeg', 'webp'].includes(extension);
                    }
            });
            if(notImages && notImages.length > 0){
                alert("이미지 파일만(jpg, png, jpeg, webp) 첨부할 수 있습니다.");
                return;
            }
            if(filesNameArray.length > 1){
                alert("메인 이미지는 한 장만 첨부할 수 있습니다!");
                return;
            }
    
            setImageName((current) => {
                const newName = {...current};
                newName.main_image = filesNameArray[0].name;
                return newName;
            });

            // label 배경 입히기 선작업
            setIsUpload(true);
            const labelUrl = URL.createObjectURL(e.target.files[0]);
            setLabelBackground(labelUrl);
            
            // filesNameArray : 처음에 Array.from(e.target.files); 로 변환한 Filelist
            setData((current) => {
                const newData = {...current};
                newData.main_image = filesNameArray;
                return newData;
            });
        }
        return;
    };
    // 서브이미지 변경 시 적용
    const onChangeSubFiles = (e) => {
        if(e.target.files && e.target.files.length > 0){
            const filesNameArray = Array.from(e.target.files);
            const notImages = filesNameArray.filter(
                v => {
                    if(v && v.name){
                        const extension = v.name.split('.').pop()?.toLowerCase() ?? '';
                        return !['jpg', 'png', 'jpeg', 'webp'].includes(extension);
                    }
            });
            if(notImages && notImages.length > 0){
                alert("이미지 파일만(jpg, png, jpeg, webp) 첨부할 수 있습니다.");
                return;
            }
            if(filesNameArray.length >= 5){
                alert("서브 이미지는 5장 이내로 첨부할 수 있습니다!");
                return;
            }
    
            setImageName((current) => {
                const newName = {...current};
                const subImagesNames = filesNameArray.map(v => v.name);
                newName.sub_images = subImagesNames;
                return newName;
            });
            
            // filesNameArray : 처음에 Array.from(e.target.files); 로 변환한 Filelist
            setData((current) => {
                const newData = {...current};
                newData.sub_images = filesNameArray;
                return newData;
            });
        }
        return;
    }
    

    // 방 갯수 상태 및 data 상태 변경
    const onChangeSelectRoom = (e) => {
        if(e){
            setOptionRoom({value: e.value, label: e.value});

            setData((current) => {
                const newData = {...current};
                newData.room_num = Number(e.value.slice(0, e.value.indexOf("개")));
                return newData;
            });
        }
    };

    // 어른 옵션 상태 및 data 상태 변경
    const onChangeSelectPerson = (e) => {
        if(e){
            setOptionPerson({value: e.value, label: e.value});

            setData((current) => {
                const newData = {...current};
                newData.max_adult = Number(e.value.slice(0, e.value.indexOf("명")));
                return newData;
            });
        }
    };
    // 어린이 옵션 상태 및 data 상태 변경
    const onChangeSelectChild = (e) => {
        if(e){
            setOptionChild({value: e.value, label: e.value});

            setData((current) => {
                const newData = {...current};
                newData.max_child = Number(e.value.slice(0, e.value.indexOf("명")));
                return newData;
            });
        }
    };
    // 유아 옵션 상태 및 data 상태 변경
    const onChangeSelectBaby = (e) => {
        if(e){
            setOptionBaby({value: e.value, label: e.value});

            setData((current) => {
                const newData = {...current};
                newData.max_baby = Number(e.value.slice(0, e.value.indexOf("명")));
                return newData;
            });
        }
    };
    
    // 카테고리 상태 값 및 data 상태 변경
    const onChangeCategory = (e) => {
        if(e.length > 3){
            alert("카테고리는 최대 3개까지 지정 가능합니다!");
            return;
        }
        setData((current) => {
            const newData = {...current};
            newData.category = e;
            return newData;
        });
    };

    // 수업 소개 data 상태 반영
    const onChangeContents = (e) => {
        setData((current) => {
            const newData = {...current};
            newData.contents = e.target.value;
            return newData;
        });
    };

    // 수업 주요 위치 option 및 data 상태 반영
    const onChangeMainLocation = (e) => {
        if(e){
            setoptionMainLocation({value: e.value, label: e.value});

            setData((current) => {
                const newData = {...current};
                newData.main_location = e.value
                return newData;
            });
        }
    };
    
    // 수업 상세 주소 data 상태 반영
    // 다음 주소 api load 와 컴포넌트 언마운트 시 정리 작업
    const onClickSubLocation = () => {
        // 스크립트 동적 로드
        const script = document.createElement('script');
        script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
        script.async = true;
        document.body.appendChild(script);
    
        // 스크립트 로드 후 실행 함수 
        script.onload = () => {
          if (window.daum) {
            window.daum.postcode.load(() => {
              new window.daum.Postcode({
                oncomplete: function(data) {
                  // 주소를 선택했을 때 호출 함수
                  setData((current) => {
                    const newData = {...current};
                    newData.sub_location = data.address;
                    return newData;
                  });
                }
              }).open( // 팝업 위치를 모니터 기준 중간 정도로 지정한다.(https://postcode.map.daum.net/guide 참고함)
                {
                    left: (window.screen.width / 2),
                    top: (window.screen.height / 2)
                }
              );
            });
          }
        }
        return () => {
          document.body.removeChild(script);
        };      
    }
    
    // 수업 가격 입력 data 반영 전 유효성 검사(1000 단위 검사)
    // 1. 입력한 문자에서 숫자만 추출
    // 2. 끝 자리 자동으로 1000 단위로 강제 변경
    // 3. 수정된 string은 숫자로 변경 후 data 반영
    const onChangePrice = (e) => {
        // 1. 입력한 문자에서 숫자만 추출
        const inputPrice = e.target.value.replace(/[^0-9]/g, '').toString();
        if(inputPrice.length >= 4){
            // 2. 끝 자리 자동으로 1000 단위로 강제 변경
            const convert1000EndPrice = "000";
            const remain1000Price = inputPrice.slice(0, inputPrice.length - 3);
            const returnDataPrice = `${remain1000Price}${convert1000EndPrice}`;
            
            // 5 억 이상일 경우 차단
            if(Number(returnDataPrice) >= 500000000){
                alert("5억 원 이상으로 설정은 불가합니다.");
                return;
            }

            // 3. 수정된 string은 숫자로 변경 후 data 반영
            setData((current) => {
                const newData = {...current};
                newData.price = Number(returnDataPrice);
                return newData;
            });

            e.target.value = e.target.value.replace(/[^0-9]/g, '').toString();
        }
    };
    // input 필드 벗어날 때 input value 교체
    const onBlurPrice = (e) => {
        e.target.value = data.price.toString();
    }

    // 강사 소개 data 반영
    const onChangeHostIntro = (e) => {
        setData((current) => {
            const newData = {...current};
            newData.host_intro = e.target.value;
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
            subImagesArray.some(file => file.name.includes(" ")) ||
            mainImageArray.some(file => file.name.includes(" "))
        ) {
            set_IsLoading(false);
            alert("이미지 파일 이름에 공백은 포함될 수 없습니다.");
            return;
        }
        // 파일 이름 길이가 20자를 초과하는지 확인
        if (
            subImagesArray.some(file => file.name.length > 20) ||
            mainImageArray.some(file => file.name.length > 20)
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
        

        if(!data.main_image || !data.title || data.price < 1000 || !data.main_location
            || !data.sub_location || !data.contents || !data.host_intro){
                set_IsLoading(false);
                alert("입력이 누락되거나 잘못된 항목을 확인해주세요.");
                return;
        }
        // 카테고리가 없을 때는 서버에서 판단하여 "전체" 로 넣어줌


        // formdata 생성 및 데이터 추가
        const formData = new FormData();
        // 파일들을 'images'라는 필드 이름으로 추가 (서버에는 images 에 main 첫번째 나머지 subimage로 들어가야 함)
        // 백엔드에서 main_image <-> sub_images 분리시킴
        formData.append('images', data.main_image[0]);
        for (let i = 0; i < data.sub_images.length; i++) {
            formData.append('images', data.sub_images[i]);
        }
        if(data.category.length > 0){
            for (let k = 0; k < data.category.length; k++) {
                formData.append('category', data.category[k]);
            }
        } else {
            // category 가 없을 시 서버에서 length 확인 후 "전체" 로 삽입
            formData.append('category', "");
        }
        formData.append('title', data.title);
        formData.append('max_adult', String(data.max_adult));
        formData.append('max_child', String(data.max_child));
        formData.append('max_baby', String(data.max_baby));
        formData.append('price', String(data.price));
        formData.append('main_location', data.main_location);
        formData.append('sub_location', data.sub_location);
        formData.append('contents', data.contents);
        formData.append('room_num', String(data.room_num));
        formData.append('host_intro', data.host_intro);
        
        myPostUpload(formData)
        .then(res => {
            if(res && res.data && res.data.code === 200){
                set_IsLoading(false);
                // 성공 모달 창을 띄우며 메인 페이지로 이동(모달 및 메인 페이지 이동은 ~Modal 컴포넌트 활용)
                setshowFinishModal(true);
            } else {
                set_IsLoading(false);
                if(res){
                    alert(res?.data?.message);
                }
            }
        })
        .catch(e => {
            set_IsLoading(false);
            console.log(e);
        });
    };


    return (
        <Container>
            {!is_Loading &&
                <>
                    <SubHeader/>
                    <motion.div 
                        initial={{ opacity: 0, transform: 'translateX(100%)' }}
                        animate={{ opacity: 1, transform: 'translateX(0)' }}
                        transition={{ duration: 0.3 }}>
                        <ImageUploadForm onSubmit={onSubmitPost}>
                            <ImageUploadLabel htmlFor="inputFileOne" $isUpload={isUpload} $newImg={labelBackground}>
                                <MainImageSpan $isUpload={isUpload}>수업 대표 이미지를 추가하세요 !</MainImageSpan>
                            </ImageUploadLabel>
                            <input type="file" id="inputFileOne" style={{display:"none"}} onChange={onChangeFiles} />
                            <ShortInputText placeholder="대표 이미지를 첨부해주세요." value={imageName.main_image} disabled />
                            <OutlineDiv />
                            <SubImageUploadLabel htmlFor="inputFiles">추가 수업 이미지 등록</SubImageUploadLabel>
                            <input type="file" id="inputFiles" style={{display:"none"}} multiple onChange={onChangeSubFiles} />
                            <ShortInputText placeholder="추가 이미지를 첨부해주세요. 최대 4장" value={imageName.sub_images} disabled />
                            <OutlineDiv />
                            <InputDiv>
                                <InputTitle>수업 이름</InputTitle>
                                <ShortInputText onChange={onChangeTitle} maxLength={20} placeholder="수업 이름을 작성해주세요. 20자 이내" />
                            </InputDiv>    
                            <OutlineDiv />
                            <InputDiv>
                                <InputTitle>옵션</InputTitle>
                                <InputSubTitle>객실 갯수</InputSubTitle>
                                <Select styles={selectCustom} options={optionsRoom} onChange={onChangeSelectRoom} value={optionRoom} />
                                <InputSubTitle>최대 인원(어른: 13세 이상)</InputSubTitle>
                                <Select styles={selectCustom} options={optionsPerson} onChange={onChangeSelectPerson} value={optionPerson} />
                                <InputSubTitle>최대 인원(어린이: 2~12세)</InputSubTitle>
                                <Select styles={selectCustom} options={optionsChild} onChange={onChangeSelectChild} value={optionChild} />
                                <InputSubTitle>최대 인원(유아: ~ 2세)</InputSubTitle>
                                <Select styles={selectCustom} options={optionsBaby} onChange={onChangeSelectBaby} value={optionBaby} />
                                <InputSubTitle>수업 카테고리 선택(최대 3개)</InputSubTitle>
                                <CategoryCheckbox value={data.category} onChange={onChangeCategory}>
                                    {optionWithIcon.map((v, i) => (
                                        <CategoryCheckboxOption key={i} value={v.value}>
                                        <div className="icon" style={{ backgroundImage: `url(${v.icon})` }} />
                                        {v.label}
                                        </CategoryCheckboxOption>
                                    ))}
                                </CategoryCheckbox>
                            </InputDiv>
                            <OutlineDiv />
                            <InputDiv>
                                <InputTitle>수업 소개</InputTitle>
                                <InputTextArea onChange={onChangeContents} maxLength={1000} placeholder="수업를 자세히 소개해주세요! (1000자)" />
                            </InputDiv>
                            <OutlineDiv />
                            <InputDiv>
                                <InputTitle>수업 위치</InputTitle>
                                <InputSubTitle>주요 위치</InputSubTitle>
                                <Select styles={selectCustom} options={optionsMainLocation} onChange={onChangeMainLocation} value={optionMainLocation} />
                                <InputSubTitle>상세 위치</InputSubTitle>
                                {/* 커서 투명화 css 추가 */}
                                <ShortInputText id="inputSubLocation" placeholder="상세 주소를 입력해주세요." onClick={onClickSubLocation} value={data.sub_location} style={{caretColor: "transparent"}} readOnly />
                            </InputDiv>
                            <OutlineDiv />
                            <InputDiv>
                                <InputTitle>수업 가격 (성인 기준)</InputTitle>
                                <InputSubTitle>1박 가격</InputSubTitle>
                                <ShortInputText type="number" placeholder="1,000원 단위로 숫자만 입력됩니다." onChange={onChangePrice} onBlur={onBlurPrice}/>
                            </InputDiv>
                            <OutlineDiv />
                            <InputDiv>
                                <InputTitle>강사 소개</InputTitle>
                                <InputTextArea maxLength={500} placeholder="강사님에 대해 소개해 주세요. 500자 이내" onChange={onChangeHostIntro} />
                            </InputDiv>
                            <OutlineDiv />
                            <SubmitButton>등록</SubmitButton>
                        </ImageUploadForm>
                    </motion.div>
                    <Footer/>
                    {showFinishModal && <UploadModal message="수업 등록이 완료되었습니다 !"
                        onClose={() => setshowFinishModal(false)} />}
                </>
            ||
                <Loading_div>
                    <Loading_img src={loading} style={{animation: "spin 0.5s 60 linear"}} />
                </Loading_div>
            }
        </Container>
    );
};

export default ClassUpload;
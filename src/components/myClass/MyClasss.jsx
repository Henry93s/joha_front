import React, { useEffect, useState } from "react";
import {
  Container,
  Header,
  Button,
  CheckboxGroup,
  CheckboxOption,
  Loading_div,
  Loading_img
} from "./MyClassStyle";
import loading from "../../assets/icons/loading.png";
import { useNavigate } from "react-router-dom";
import NoClass from "./NoClass";
import ClassItem from "./ClassItems"; // 분리한 아이템 컴포넌트 가져오기
import mainPostLoad from "../../api/mainPostLoad";
import { mypostDelete } from "../../api/myPostDelete";
import MyClassModal from "./MyClassModal";


const MyClasss = () => {
  // modal 호출 state
  const [isModal, setIsModal] = useState(false);
  // 로딩 state
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  // 나의 수업 state
  const [Classs, setClasss] = useState([]);
  // checkbox state
  const [checkValue, setCheckValue] = useState([]);

  // 첫 페이지 load 나 삭제 시 재 loading 을 위한 함수 셋팅
  const loadingFunction = () => {
    // 기존 메인에서 post read 하는 api 를 mymode 값으로 제어하기 때문에 나머지 값들은 기본 값으로 셋팅
    const search = {
      city: "전체",
      adult: 0,
      child: 0,
      baby: 0
    };
    // 로그인 한 사용자만 로그인 사용자가 올린 수업을 확인할 수 있으므로 로그인 판단 함수를 mainPostLoad api 호출 함수보다 먼저 오도록 위치 변경
    if(!localStorage.getItem('is_logined') || localStorage.getItem('is_logined') === "false"){
      navigate('/');
      return;
    }
    else {
      mainPostLoad.getPostsRead({nowpage: 1, search, category: "전체", mymode: true})
      .then(res => {
        setClasss(res || []);
      })
      .catch(e => {
        console.error("수업을 불러오는데 실패했습니다.", e);
      });
      setIsLoading(true);
    }
  };

  /** 나의 수업 가져오기 */
  useEffect(() => {
    loadingFunction();
  }, []);

  // 나의 수업 을 load 될 때 로딩 stop
  useEffect(() => {
    if(isLoading){
        // 실제 로딩은 매우 빨라서 loading 이 보이지 않아 최소 시간 0.15 초 정도는 로딩화면이 보이게 함.
        setTimeout(() => {
            setIsLoading(false);
        }, 150);
    }
  },[Classs]);

  /** 체크박스 클릭 시 해당 수업 checked 상태 변경 */
  const onChangeHandleCheckBox = (checkedValue) => {
    if(checkedValue.length > 1){
      alert("등록 삭제 및 수정은 1 개씩 가능합니다.");
      return;
    }
    setCheckValue(checkedValue);
  };

  /** 등록 삭제 버튼 클릭 시 */
  const onClickHandleDelete = () => {
    if(checkValue.length === 0){
      alert("삭제할 수업 을 체크해주세요.");
      return;
    }
    setIsModal(true)
  };

  /** 수정 버튼 클릭 시 */
  const onClickHandleEdit = () => {
    if(checkValue.length === 0){
      alert("수정할 수업 을 체크해주세요.");
      return;
    }
    navigate('/upload/edit', { state: { v: checkValue[0] } });
    // 체크 벨류 초기화
    setCheckValue([]);
    return;
  };

  /** 수업 삭제 취소 */
  const onClickHandleCancelDelete = () => {
    setIsModal(false);
  };

  /** 수업 삭제 확인 */
  const onClickHandleConfirmDelete = async () => {
    try {
      mypostDelete({nanoid: checkValue[0]})
      .then((res) => {
        if(res?.data && res?.data.code === 200){
          loadingFunction();
          // 체크 벨류 초기화
          setCheckValue([]);
        } 
        else {
          alert(res?.data?.message);
        } 
      })
      .catch(e => {
        console.log(e);
      });
      setIsModal(false);
      return;
    } catch (error) {
      console.error("수업 삭제에 실패했습니다.", error);
      alert("수업 삭제에 실패했습니다.");
      return;
    }
  };

  return (
    <>
    {Classs.length > 0 ? (
    <Container>
    {!isModal &&
      <>
      <Header>
        <Button onClick={onClickHandleDelete}>삭제</Button>
        <Button onClick={onClickHandleEdit}>수정</Button>
      </Header>
      {!isLoading &&
        <CheckboxGroup value={checkValue} onChange={onChangeHandleCheckBox}>
          {Classs.map((Class, i) => (
            <ClassItem
            key={i}
            Class={Class}
            // 각 나의 수업 아이템 클릭 시의 동작은 ClassItem 에서 정의
            CheckboxOption={CheckboxOption}
            >
            </ClassItem>
          ))}
        </CheckboxGroup>
      ||
          <Loading_div>
            <Loading_img src={loading} style={{animation: "spin 0.5s 3 linear"}} />
          </Loading_div>
        }
      </>
    ||
      <MyClassModal
      message="정말 삭제하시겠습니까?"
      onConfirm={onClickHandleConfirmDelete}
      onCancel={onClickHandleCancelDelete}
      />
    }      
    </Container>
    ) : (
      <NoClass />
    )}
    </>
  );
}
export default MyClasss;

import KakaoMap from "./KakaoMap"; // KakaoMap 컴포넌트
import useKakaoLoaderOrigin from "../../api/useKakaoLoader";
import styled from "styled-components";

const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48vw;
`;

const MapContainer = ({ places, address }) => {
  const [loading, error] = useKakaoLoaderOrigin();

  if (loading) {
    return <Loading>지도 로딩 중...</Loading>; // 로딩 중일 때 표시할 UI
  }

  if (error) {
    return <div>지도를 불러오는 데 실패했습니다: {error.message}</div>; // 에러 처리
  }
  return <KakaoMap places={places} address={address} />;
};

export default MapContainer;

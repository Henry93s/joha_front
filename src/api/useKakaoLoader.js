import { useKakaoLoader } from "react-kakao-maps-sdk";
const useKakaoLoaderOrigin = () => {
  const [loading, error] = useKakaoLoader({
    appkey: process.env.REACT_APP_KAKAO_APP_KEY,
    libraries: ["clusterer", "services"], // 사용하고싶은 다른 라이브러리 추가
  });

  return [loading, error];
};

export default useKakaoLoaderOrigin;

import React, { useEffect } from "react";

const KakaoMap = ({ address, title, moveup }) => {
  useEffect(() => {
    // Kakao Maps API 스크립트를 동적으로 추가
    const script = document.createElement("script");
    script.async = true;
    // Geocoder메서드를 사용하려면 script에 libraries=services속성이 들어가야 함
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_APP_KEY}&autoload=false&libraries=services`;
    document.head.appendChild(script);
    if (moveup === -1) {
      script.onload = () => {
        // Kakao Maps API 로드 후 실행할 함수
        if (window.kakao && window.kakao.maps) {
          window.kakao.maps.load(() => {
            const mapContainer = document.getElementById("map"); // 지도를 표시할 div
            const mapOption = {
              center: new window.kakao.maps.LatLng(37.5665, 126.978), // 지도의 중심 좌표
              level: 3, // 지도의 확대 레벨
            };

            // 지도를 생성합니다
            const map = new window.kakao.maps.Map(mapContainer, mapOption);

            // 주소-좌표 변환 객체를 생성합니다
            const geocoder = new window.kakao.maps.services.Geocoder();

            // 주소로 좌표를 검색합니다
            geocoder.addressSearch(address, function (result, status) {
              // 정상적으로 검색이 완료됐으면
              if (status === window.kakao.maps.services.Status.OK) {
                const coords = new window.kakao.maps.LatLng(
                  result[0].y,
                  result[0].x
                );

                // 결과값으로 받은 위치를 마커로 표시합니다
                const marker = new window.kakao.maps.Marker({
                  map: map,
                  position: coords,
                });

                // 인포윈도우로 장소에 대한 설명을 표시합니다
                const infowindow = new window.kakao.maps.InfoWindow({
                  content: `<div style="width:150px;text-align:center;padding:6px 0;">${title}</div>`,
                });
                infowindow.open(map, marker);

                // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                map.setCenter(coords);

                const handleResize = () => {
                  const markerPosition = marker.getPosition();
                  map.relayout();
                  map.setCenter(markerPosition);
                };
                window.addEventListener("resize", handleResize);
                return () => {
                  // cleanup
                  window.removeEventListener("resize", handleResize);
                };
              }
            });
          });
        } else {
          console.error("Kakao Maps script failed to load.");
        }
      };

      script.onerror = () => {
        console.error("Kakao Maps script failed to load.");
      };

      // Cleanup function to remove the script when the component unmounts
      return () => {
        document.head.removeChild(script);
      };
    }
  }, [address, title]);

  return <div id="map" style={{ width: "100%", height: "100%" }}></div>;
};

export default KakaoMap;

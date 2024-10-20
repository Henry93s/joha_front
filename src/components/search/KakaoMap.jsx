import React, { useEffect } from "react";

const KakaoMap = ({ places, address }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_APP_KEY}&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById("map"); // 지도를 표시할 div
        const mapOption = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        };

        const map = new window.kakao.maps.Map(mapContainer, mapOption); // 지도 생성 및 객체 리턴

        // 주소-좌표 변환 객체를 생성합니다
        var geocoder = new window.kakao.maps.services.Geocoder();

        // 주소로 좌표를 검색합니다
        geocoder.addressSearch(address, function (result, status) {
          // 정상적으로 검색이 완료됐으면
          if (status === window.kakao.maps.services.Status.OK) {
            var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            map.setCenter(coords);
          }
        });

        // 마커 생성
        if (places.length > 0) {
          console.log(places);
          places.forEach((place) => {
            const markerPosition = new window.kakao.maps.LatLng(
              place.latlng.lat,
              place.latlng.lng
            );

            const marker = new window.kakao.maps.Marker({
              position: markerPosition,
              title: place.title,
            });

            marker.setMap(map);
          });
        }
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [places, address]);

  return <div id="map" style={{ width: "100%", height: "450px" }}></div>;
};

export default KakaoMap;

import axios from "axios";
import React, { useEffect, useState } from "react";

const KakaoMap = ({ places }) => {
  // 카카오맵 API 로드
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=b27bdfb85b1124cb1f51e1859cd1da16&autoload=false&libraries=services`;
    document.head.appendChild(script);

    script.onload = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          var mapContainer = document.getElementById("map"), // 지도를 표시할 div
            mapOption = {
              center: new window.kakao.maps.LatLng(37.566826, 126.9786567), // 중심좌표
              level: 3, // 확대 레벨
            };

          var map = new window.kakao.maps.Map(mapContainer, mapOption);

          // 장소별 마커 표시
          places.forEach((place) => {
            var markerPosition = new window.kakao.maps.LatLng(
              place.latitude,
              place.longitude
            );

            // 마커 생성 및 지도에 표시
            var marker = new window.kakao.maps.Marker({
              position: markerPosition,
            });
            marker.setMap(map);

            // 마우스 오버 시 인포윈도우에 장소명 표시
            var infowindow = new window.kakao.maps.InfoWindow({
              content: `<div style="padding:5px;z-index:1;">${place.name}</div>`,
            });

            window.kakao.maps.event.addListener(
              marker,
              "mouseover",
              function () {
                infowindow.open(map, marker);
              }
            );

            window.kakao.maps.event.addListener(
              marker,
              "mouseout",
              function () {
                infowindow.close();
              }
            );
          });
        });
      }
    };

    return () => {
      document.head.removeChild(script); // 컴포넌트 언마운트 시 스크립트 제거
    };
  }, [places]);

  return <div id="map" style={{ width: "100%", height: "47vw" }}></div>;
};

export default KakaoMap;

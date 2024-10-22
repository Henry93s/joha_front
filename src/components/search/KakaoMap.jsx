import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const KakaoMap = ({ places, address }) => {
  const [state, setState] = useState({
    // 지도 초기 위치
    center: { lat: null, lng: null },
    // 지도 위치 변경시 panto를 이용할지(부드럽게 이동)
    isPanto: true,
  });
  const [newPlaces, setNewPlaces] = useState(places);

  // 유저 주소 중심으로 지도 옮기기
  useEffect(() => {
    // 주소를 좌표로 변환한는 함수
    const geocoder = new window.kakao.maps.services.Geocoder();

    // 주소를 좌표로 변환하여 state에 저장
    let callback = function (result, status) {
      if (status === window.kakao.maps.services.Status.OK) {
        const newSearch = result[0];
        setState({
          center: { lat: newSearch.y, lng: newSearch.x },
        });
      }
    };
    geocoder.addressSearch(`${address}`, callback);
    setNewPlaces((prevArr) => {
      const newArr = [...prevArr].map((el) => {
        console.log(`${el.main_location} ${el.sub_location}`);
        geocoder.addressSearch(
          `${el.main_location} ${el.sub_location}`,
          (result, status) => {
            console.log(status);
            if (status === window.kakao.maps.services.Status.OK) {
              const location = result[0];
              console.log(location);
              el.lat = location.y;
              el.lng = location.x;
            }
          }
        );
        return el;
      });
      return newArr;
    });
    console.log(newPlaces);
  }, [address]);

  return (
    <Map // 지도를 표시할 Container
      id="map"
      center={state.center}
      isPanto={state.isPanto}
      style={{
        // 지도의 크기
        width: "100%",
        height: "350px",
      }}
      level={3} // 지도의 확대 레벨
    >
      {newPlaces.map((place, index) => (
        <MapMarker
          key={`${place.title}-${place.latlng}`}
          position={{ lat: place.lat, lng: place.lng }} // 마커를 표시할 위치
          image={{
            src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
            size: {
              width: 24,
              height: 35,
            }, // 마커이미지의 크기입니다
          }}
          title={place.title} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        />
      ))}
    </Map>
  );
};

export default KakaoMap;

import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";

const Container = styled.div`
  padding: 30px 0 30px;
`;
const Title = styled.h2`
  font-size: 20px;
  padding: 0 15px 12px;
`;
const SlideCont = styled.div`
  padding-left: 15px;
`;
const SlideImg = styled.div`
  & img {
    width: 100%;
  }
  height: 45vw;
  max-height: 300px;
  background: #d9d9d9;
  border-radius: 15px;
`;
const StoryTitle = styled.p`
  padding-top: 5px;
  font-size: 14px;
  font-weight: 600;
`;
const Story = () => {
  return (
    <Container>
      <Title>JOHA Story</Title>
      <SlideCont>
        <Swiper spaceBetween={15} slidesPerView={1.3}>
          <SwiperSlide>
            <Link to="">
              <SlideImg>
                <img />
              </SlideImg>
              <StoryTitle>스토리 제목</StoryTitle>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="">
              <SlideImg>
                <img />
              </SlideImg>
              <StoryTitle>스토리 제목</StoryTitle>
            </Link>
          </SwiperSlide>
        </Swiper>
      </SlideCont>
    </Container>
  );
};

export default Story;

import Header from "../components/layout/Header";
import FooterMenu from "../components/layout/FooterMenu";
import FindLesson from "../components/main/FindLesson";
import CommingLesson from "../components/main/CommingLesson";
import TopLesson from "../components/main/TopLesson";
import Story from "../components/main/Story";

const MainPage = () => {
  return (
    <>
      <Header />
      <FindLesson />
      <CommingLesson />
      <TopLesson />
      <Story />
      <FooterMenu />
    </>
  );
};

export default MainPage;

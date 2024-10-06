import React from "react";
import SubHeader from "../components/layout/Header";
import SubLayout from "../components/layout/SubLayout";
import MainFooter from "../components/layout/FooterMenu";
import MyClasss from "../components/myClass/MyClasss";
import { motion } from "framer-motion";

const MyClassesPage = () => {
  return (
    <>
    <SubHeader />
      <motion.div
      initial={{ opacity: 0, position: 'relative', left: '100%' }}
      animate={{ opacity: 1, position: 'relative', left: '0' }}
      transition={{ duration: 0.3 }}
    >
      <SubLayout pageTitle="나의 수업">
        <MyClasss />
      </SubLayout>
      </motion.div>
      <MainFooter />
    </>
  );
};

export default MyClassesPage;

import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import TransitionEffect from "../components/TransitionEffect";
import NameComponent from "../components/about/NameComponent";
import { WorkExperience, EducationalBackground } from "../components/about/Experience";
import Layout from "../components/Layout";
import Container from "../components/Container";
import MousePointer from "../components/MousePointer";
import MousePointerArea from "../components/MousePointerArea";
import BottomSmoke from "../components/home/BottomSmoke";

const about = () => {
  // function preventDefault(e) {
  //   e.stopPropagation();
  //   e.preventDefault();
  // }
  // useEffect(() => {
  //   addEventListener("touchmove", preventDefault);
  //   addEventListener("touchstart", preventDefault);
  //   return () => {
  //     removeEventListener("touchmove", preventDefault);
  //     removeEventListener("touchstart", preventDefault);
  //   };
  // }, []);
  return (
    <Box pos="relative" top="0" left="0" zIndex="15" w="100%" h="100%" userSelect="none">
      <TransitionEffect />
      <MousePointer />
      <Layout>
        <Container>
          <NameComponent />
          <EducationalBackground />
          <WorkExperience />
        </Container>
      </Layout>
    </Box>
  );
};

export default about;

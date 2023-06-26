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
import Parallax from "../components/Parallax";

const about = () => {
  return (
    <>
      <TransitionEffect />
      <Box pos="relative" paddingBottom="10rem" top="0" left="0" zIndex="15" w="100%" h="100%" userSelect="none">
        <MousePointer />

        <Layout>
          <Container>
            <NameComponent />
            <EducationalBackground />
            <WorkExperience />
          </Container>
        </Layout>
      </Box>
    </>
  );
};

export default about;

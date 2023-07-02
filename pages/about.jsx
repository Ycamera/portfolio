import React, { useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
import TransitionEffect from "../components/TransitionEffect";
import NameComponent from "../components/about/NameComponent";
import { WorkExperience, EducationalBackground } from "../components/about/Experience";
import Layout from "../components/Layout";
import Container from "../components/Container";
import MousePointer from "../components/MousePointer";
import MousePointerArea from "../components/MousePointerArea";
import BottomSmoke from "../components/home/BottomSmoke";
import Parallax from "../components/Parallax";
import { color, letterSpacing } from "../styles/variable.mjs";
import NextLink from "next/link";
import Motion from "../components/Motion";

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

            <Flex justifyContent="center" w="100%">
              <Box w="60%" h="0.1rem" mt="10rem" mb="10rem" marginInline="auto" bg={color.light300} filter="blur(0.1rem)"></Box>
            </Flex>
            <WorkExperience />
            <Box>
              <Flex justifyContent="center" w="100%">
                <Box w="60%" h="0.1rem" mt="10rem" mb="5rem" marginInline="auto" bg={color.light300} filter="blur(0.1rem)"></Box>
              </Flex>
              <NextPageLink />
            </Box>
          </Container>
        </Layout>
      </Box>
    </>
  );
};

const NextPageLink = () => {
  const ease = [0.65, 0.28, 0.27, 1.03];

  return (
    <Flex
      w="100%"
      justifyContent="flex-end"
      margin="auto"
      fontSize={{ base: "1.2rem", sm: "2rem" }}
      color={color.light}
      letterSpacing={letterSpacing.md}
    >
      <NextLink href="/skill">
        <Motion
          initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
          whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5, ease: ease }}
        >
          <Box as="a" cursor="pointer">
            NEXT PAGE
          </Box>
        </Motion>
      </NextLink>
    </Flex>
  );
};

export default about;

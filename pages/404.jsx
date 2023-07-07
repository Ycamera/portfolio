import React from "react";
import { Flex, Box, Heading } from "@chakra-ui/react";
import BackgroundCanvasParticle from "../components/BackgroundCanvasParticle";
import TransitionEffect from "../components/TransitionEffect";
const ErrorPage = () => {
  return (
    <>
      <TransitionEffect />

      <Flex
        w="100%"
        h="100%"
        top="0"
        left="0"
        pos="fixed"
        bg="#000"
        justifyContent={"center"}
        alignItems="center"
        overflow="hidden"
        style={{ touchAction: "none" }}
      >
        <Heading as="h1" zIndex="1" userSelect="none" pointerEvents="none">
          404 page not found
        </Heading>
        <BackgroundCanvasParticle zIndex="0" />
      </Flex>
    </>
  );
};

export default ErrorPage;

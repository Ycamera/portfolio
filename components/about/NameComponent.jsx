import React, { useContext } from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Motion from "../Motion";
import { color, letterSpacing } from "/styles/variable.mjs";
import { PointerContext } from "../../pages/_app";
import MousePointerArea from "../MousePointerArea";
import { ParallaxElement } from "../Parallax";
import ScrollAnimateElement from "../animation/ScrollAnimateElement";
import HeadLineAppear from "../HeadLineAppear";
import TextAnimationComponent from "../animation/TextAnimationComponent";

const NameComponent = () => {
  return (
    <Flex alignItems="center" justifyContent="center" h="100vh" w="100%" userSelect="none">
      <MousePointerArea
        onEnterKey="lg"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: "20rem",
          boxSizing: "content-box",
        }}
      >
        <HeadLineAppear text="RYOSUKE.K" />
        <TextAnimationComponent text="AICHI" style={{ mt: "1rem" }} delay="1.9" />
        <TextAnimationComponent text="1995.4.12" delay="2" />
      </MousePointerArea>
    </Flex>
  );
};

export default NameComponent;

import React from "react";
import { Flex } from "@chakra-ui/react";
import MousePointerArea from "../mousepointer/MousePointerArea";
import HeadLineAppear from "../animation/HeadLineAppear";
import TextAnimationComponent from "../animation/TextAnimationComponent";
import ScrollComponent from "../scroll/ScrollComponent";

const NameComponent = () => {
  return (
    <Flex alignItems="center" justifyContent="center" h="100vh" w="100%" userSelect="none" pos="relative">
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
      <ScrollComponent delay="2.8" />
    </Flex>
  );
};

export default NameComponent;

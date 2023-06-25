import React, { useContext } from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Motion from "../Motion";
import { color, letterSpacing } from "/styles/variable.mjs";
import { PointerContext } from "../../pages/_app";
import MousePointerArea from "../MousePointerArea";

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
        <Heading as="h1" fontSize={{ base: "2.5rem", sm: "4rem" }} color={color.secondary} letterSpacing={letterSpacing.lg}>
          RYOSUKE.K
        </Heading>
        <TextComponent text="AICHI" style={{ mt: "1rem" }} />
        <TextComponent text="1995.4.12" />
      </MousePointerArea>
    </Flex>
  );
};

const TextComponent = ({ text, style }) => {
  return (
    <Text color={color.light} fontSize={{ base: "1.2rem", sm: "1.5rem" }} letterSpacing={letterSpacing.md} {...style}>
      {text}
    </Text>
  );
};

export default NameComponent;

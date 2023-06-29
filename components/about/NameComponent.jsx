import React, { useContext } from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Motion from "../Motion";
import { color, letterSpacing } from "/styles/variable.mjs";
import { PointerContext } from "../../pages/_app";
import MousePointerArea from "../MousePointerArea";
import { ParallaxElement } from "../Parallax";
import ScrollAnimateElement from "../animation/ScrollAnimateElement";

const NameComponent = () => {
  const variants = { initial: { scale: 1.5, opacity: 0 }, animate: { scale: 1, opacity: 1 }, transition: { delay: 0.5, duration: 1 } };

  const variantsForLetter = {
    initial: {
      opacity: 0,
      y: "10rem",
    },
    animate: {
      opacity: 1,
      y: "0rem",
    },
    transition: {
      // duration: 0.5,
    },
  };

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
        {/* <Motion variants={variants} initial="initial" animate="animate" transition={variants?.transition}> */}
        <Flex justifyContent="center" alignItems="center" flexDirection="column">
          <Heading as="h1" fontSize={{ base: "2.5rem", sm: "4rem" }} color={color.secondary} letterSpacing={letterSpacing.lg}>
            {"RYOSUKE.K".split("").map((letter, idx) => {
              return (
                <Motion
                  variants={variantsForLetter}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: idx * 0.4, ...variantsForLetter?.transition }}
                >
                  <Box as="span">{letter}</Box>
                </Motion>
              );
            })}
          </Heading>
          <TextComponent text="AICHI" style={{ mt: "1rem" }} />
          <TextComponent text="1995.4.12" />
        </Flex>
        {/* </Motion> */}
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

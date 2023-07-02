import React, { useState, useEffect, useLayoutEffect } from "react";
import Motion from "./Motion";
import { Flex, Box, Heading } from "@chakra-ui/react";
import { color, letterSpacing } from "../styles/variable.mjs";

const ease = [0.65, 0.28, 0.27, 1.03];

const HeadLineAppear = ({ text, style }) => {
  const variantsForLetter = {
    initial: {
      y: "10rem",
    },
    animate: {
      opacity: 1,
      y: "0rem",
    },
    transition: {
      duration: "1",
      ease: ease,
    },
  };

  return (
    <Motion initial={{ scale: 1.35 }} animate={{ scale: 1 }} transition={{ delay: 1.7, duration: 1, ease: [0.65, 0.28, 0.27, 1.03] }}>
      <Heading
        as="h1"
        display="flex"
        fontSize={{ base: "2.5rem", sm: "4rem" }}
        color={color.secondary}
        letterSpacing={letterSpacing.lg}
        {...(style && style)}
      >
        <Flex overflow="hidden" pos="relative">
          {text.split("").map((letter, idx) => {
            return (
              <Motion
                variants={variantsForLetter}
                initial="initial"
                animate="animate"
                transition={{ delay: idx * 0.03 + 0.3, ...variantsForLetter.transition }}
                key={letter + idx}
              >
                <Box as="span" display="block">
                  {letter}
                </Box>
              </Motion>
            );
          })}
          <Motion initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ duration: 0.8, delay: 0.6 }}>
            <Box pos="absolute" w="100%" h="0.06rem" bgGradient={`linear(to-r, transparent , ${color.light}, transparent )`} bottom="0" left="0" />
          </Motion>
        </Flex>
      </Heading>
    </Motion>
  );
};

export default HeadLineAppear;

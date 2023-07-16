import Motion from "../Motion";
import { Box, Text } from "@chakra-ui/react";
import { color, letterSpacing } from "/styles/variable.mjs";
import { memo } from "react";

const ease = [0.65, 0.28, 0.27, 1.03];

const TextAnimationComponent = memo(({ text, style, delay }) => {
  const variantsForText = {
    initial: {
      y: "5rem",
    },
    animate: {
      y: "0rem",
    },
    transition: {
      duration: "1",
      ease: ease,
    },
  };
  return (
    <Box overflow="hidden">
      <Text display="flex" fontSize={{ base: "1.2rem", sm: "1.5rem" }} letterSpacing={letterSpacing.md} {...style}>
        {text.split("").map((letter, idx) => {
          return (
            <Motion
              variants={variantsForText}
              initial="initial"
              animate="animate"
              transition={{ delay: idx * 0.03 + +delay, ...variantsForText.transition }}
              key={letter + idx}
            >
              <Box as="span" display="block" color={color.light}>
                {letter}
              </Box>
            </Motion>
          );
        })}
      </Text>
    </Box>
  );
});

export default TextAnimationComponent;

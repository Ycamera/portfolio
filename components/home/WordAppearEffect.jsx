import React, { memo } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { MotionY } from "../Motion";

const WordMotion = memo(({ word, i }) => {
  const customTransition = {
    mass: 1,
    stiffness: 30,
  };

  return (
    <MotionY y={75} appearDelay={i * 0.03} disappearDelay={i * 0.03} customTransition={customTransition}>
      <pre>
        <Text as="span" pointerEvents="none" userSelect={"none"}>
          {word}
        </Text>
      </pre>
    </MotionY>
  );
});

const WordAppearEffect = memo(({ text }) => {
  return (
    <Flex>
      {text.split("").map((word, i) => (
        <WordMotion word={word} i={i} key={word + i} />
      ))}
    </Flex>
  );
});
export default WordAppearEffect;

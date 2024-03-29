import React, { useEffect, useState, memo } from "react";
import { Box, Flex } from "@chakra-ui/react";
import Motion from "../Motion";

const Mirror = memo(({ w, i, reverseDelay, delay, reverse, duration, firstRendering }) => {
  return (
    <Box w={`${w}%`} h="100vh" pos="relative">
      <Motion
        initial={{ width: !firstRendering ? "0" : "100%" }}
        animate={{ width: "0" }}
        transition={{ duration, delay: reverse ? reverseDelay : delay }}
        exit={{ width: "100%" }}
        style={{ transformOrigin: reverse ? "right" : "left" }}
      >
        <Box as="span" bg="#000" w="100%" h="100%" pos="absolute" />
      </Motion>
    </Box>
  );
});

const TransitionEffect = memo(({ reverseEffect = false, firstRendering = true }) => {
  const numberOfLine = 20;
  const delayFrequency = 0.035;
  const duration = 0.6;

  const arr = new Array(numberOfLine).fill().map((_, i) => i);
  const width = 100 / numberOfLine;

  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setReverse(true);
    }, (numberOfLine * delayFrequency + duration) * 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Flex pos={"fixed"} top="0" w="100%" h="100vh" zIndex={10000} pointerEvents="none">
      {arr.map((i) => {
        return (
          <Mirror
            key={i}
            w={width}
            i={i}
            reverse={reverseEffect ? reverse : !reverse}
            reverseDelay={20 * delayFrequency - delayFrequency * i}
            delay={delayFrequency * i}
            duration={duration}
            firstRendering={firstRendering}
          />
        );
      })}
    </Flex>
  );
});

export default TransitionEffect;

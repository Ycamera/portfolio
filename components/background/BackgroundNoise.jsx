import React, { useContext } from "react";
import { Flex, keyframes } from "@chakra-ui/react";
import noisePng from "../../public/images/noise.png";
import { RootFontSizeContext } from "../../pages/_app";

const BackgroundNoise = () => {
  const rootFontSize = useContext(RootFontSizeContext);
  const backgroundSize = rootFontSize * 6;

  const noiseAnimate = keyframes`
  0% {
    transform: translate(0, 0);
  }
  10% {
      transform: translate(-5%, -5%);
  }
  20% {
      transform: translate(-5%, 5%);
  }
  30% {
      transform: translate(0%, -5%);
  }
  40% {
      transform: translate(-5%, 5%);
  }
  50% {
      transform: translate(-5%, 5%);
  }
  60% {
      transform: translate(5%, 0);
  }
  70% {
      transform: translate(0, 5%);
  }
  80% {
      transform: translate(-5%, 0);
  }
  90% {
      transform: translate(5%, 10%);
  }
  100% {
      transform: translate(-5%, 5%);
  }`;

  return (
    <Flex
      zIndex="10000"
      pos="fixed"
      left="-50%"
      right="-50%"
      top="-50%"
      bottom="-50%"
      w="200%"
      h="200vh"
      justifyContent="center"
      alignItems="center"
      bg={`url(${noisePng.src}) repeat`}
      animation={`${noiseAnimate}  linear infinite 0.3s`}
      backgroundSize={backgroundSize}
      pointerEvents="none"
      userSelect="none"
      opacity="0.8"
    />
  );
};

export default BackgroundNoise;

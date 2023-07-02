import React from "react";
import { Box } from "@chakra-ui/react";

const BottomSmoke = () => {
  return <Box pointerEvents="none" bg="rgba(255,255,255,0.8)" pos="fixed" h="5%" w="100%" filter="blur(2rem)" bottom="0" zIndex={100} />;
};

export default BottomSmoke;

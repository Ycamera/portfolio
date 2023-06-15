import React from "react";
import { Box } from "@chakra-ui/react";

const BottomSmoke = () => {
  return <Box bg="rgba(255,255,255,0.8)" pos="absolute" h="5%" w="100%" filter="blur(30px)" bottom="0" zIndex={10} />;
};

export default BottomSmoke;

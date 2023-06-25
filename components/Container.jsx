import React from "react";
import { Box, Flex } from "@chakra-ui/react";

const Container = ({ children }) => {
  return (
    <Box w="min(100%,60rem)" marginInline="auto">
      {children}
    </Box>
  );
};

export default Container;

import React, { memo } from "react";
import { Box } from "@chakra-ui/react";

const Container = memo(({ children }) => {
  return (
    <Box w="min(100%,60rem)" marginInline="auto">
      {children}
    </Box>
  );
});

export default Container;

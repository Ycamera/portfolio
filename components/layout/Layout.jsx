import React, { memo } from "react";
import { Box } from "@chakra-ui/react";

const Layout = memo(({ children }) => {
  return (
    <Box w="100%" paddingInline="1rem">
      {children}
    </Box>
  );
});

export default Layout;

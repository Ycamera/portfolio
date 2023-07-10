import React from "react";
import { Box } from "@chakra-ui/react";

const Layout = ({ children }) => {
  return (
    <Box w="100%" paddingInline="1rem">
      {children}
    </Box>
  );
};

export default Layout;

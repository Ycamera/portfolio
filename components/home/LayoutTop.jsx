import React from "react";

import { Flex } from "@chakra-ui/react";

const LayoutTop = ({ children }) => {
  return (
    <Flex as="section" flexDirection="column" justifyContent={"center"} alignItems="center" pos="fixed" h="100%" w="100%" top="0" zIndex="0">
      {children}
    </Flex>
  );
};

export default LayoutTop;

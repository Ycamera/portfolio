import React, { useContext, useState, useEffect } from "react";

import { color } from "/styles/fontColor";
import { Flex } from "@chakra-ui/react";
import BottomSmoke from "./BottomSmoke";
const LayoutTop = ({ children }) => {
  return (
    <Flex as="section" flexDirection="column" justifyContent={"center"} alignItems="center" pos="fixed" h="100%" w="100%" top="0" zIndex="0">
      {children}
    </Flex>
  );
};

export default LayoutTop;

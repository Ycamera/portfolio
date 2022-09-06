import React, { useContext, useState, useEffect } from "react";

import { color } from "/styles/fontColor";
import { Flex } from "@chakra-ui/react";
import BottomSmoke from "./BottomSmoke";
const LayoutTop = ({ children }) => {
	return (
		<Flex
			flexDirection="column"
			justifyContent={"center"}
			alignItems="center"
			pos="fixed"
			h="100vh"
			w="100vw"
			top="0"
			zIndex="0"
		>
			{children}
		</Flex>
	);
};

export default LayoutTop;

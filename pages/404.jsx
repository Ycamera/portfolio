import React from "react";
import { Flex, Box, Heading } from "@chakra-ui/react";
import BackgroundCanvasParticle from "../components/BackgroundCanvasParticle";

const ErrorPage = () => {
	return (
		<Flex w="100%" h="100vh" bg="#000" justifyContent={"center"} alignItems="center">
			<Heading as="h1" zIndex="1">
				404 page not found
			</Heading>
			<BackgroundCanvasParticle zIndex="0" />
		</Flex>
	);
};

export default ErrorPage;

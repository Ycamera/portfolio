import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Motion, { MotionY } from "/components/Motion";
import LayoutTop from "./LayoutTop";

import LearnMoreButton from "./LearnMoreButton";

const About = () => {
	return (
		<LayoutTop>
			<MotionY y={100} disappearDelay={0.1}>
				<Heading as="h1" fontWeight="400" fontSize="4rem" letterSpacing="0.5rem">
					WHO I AM
				</Heading>
			</MotionY>
			<LearnMoreButton link="about" />
		</LayoutTop>
	);
};

export default About;

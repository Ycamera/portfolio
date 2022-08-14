import { Box, Flex, Heading } from "@chakra-ui/react";
import Motion, { MotionY } from "/components/Motion";

import LayoutTop from "./LayoutTop";
import LearnMoreButton from "./LearnMoreButton";

const Skill = () => {
	return (
		<LayoutTop>
			<MotionY y={100} disappearDelay={0.1}>
				<Heading as="h1" fontWeight="400" fontSize="4rem" letterSpacing="0.5rem" zIndex="10">
					WHAT I CAN DO
				</Heading>
			</MotionY>
			<LearnMoreButton link="skill" />
		</LayoutTop>
	);
};

export default Skill;

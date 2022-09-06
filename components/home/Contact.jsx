import { Box, Flex, Heading } from "@chakra-ui/react";
import Motion, { MotionY } from "/components/Motion";

import LayoutTop from "./LayoutTop";
import LearnMoreButton from "./LearnMoreButton";
import WordAppearEffect from "./WordAppearEffect";

const Contact = () => {
	return (
		<LayoutTop>
			<MotionY y={100} disappearDelay={0.1}>
				<Heading as="h1" fontWeight="400" fontSize="4rem" letterSpacing="0.5rem" zIndex="10">
					<WordAppearEffect text="BE IN TOUCH" />
				</Heading>
			</MotionY>
			<LearnMoreButton link={"contact"} text="Contact" />
		</LayoutTop>
	);
};

export default Contact;

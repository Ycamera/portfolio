import { Heading } from "@chakra-ui/react";
import { MotionY } from "/components/Motion";

import LayoutTop from "./LayoutTop";
import LearnMoreButton from "./LearnMoreButton";
import WordAppearEffect from "./WordAppearEffect";

const WordComponent = ({ text, link, buttonText = false }) => {
  return (
    <LayoutTop>
      <MotionY y={100} disappearDelay={0.1}>
        <Heading as="h2" fontWeight="400" fontSize={{ base: "2.5rem", sm: "4rem" }} letterSpacing="0.5rem" zIndex="10">
          <WordAppearEffect text={text} />
        </Heading>
      </MotionY>
      <LearnMoreButton link={link} {...(buttonText && { text: buttonText })} />
    </LayoutTop>
  );
};

export default WordComponent;

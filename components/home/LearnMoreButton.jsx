import Motion, { MotionY } from "/components/Motion";
import { Text, Flex, Box } from "@chakra-ui/react";
import { color } from "/styles/fontColor";
import NextLink from "next/link";
const LearnMoreButton = ({ link, text = "Learn More" }) => {
  return (
    <NextLink href={link}>
      <a style={{ marginTop: "2rem", pointerEvents: "auto" }}>
        <MotionY y={100} appearDelay={0.25}>
          <Flex justifyContent={"center"} onMouseEnter={() => {}}>
            <Box
              display="inline-block"
              padding="0.5rem 1.5rem"
              fontSize="1rem"
              className="btn-learn-more"
              cursor="pointer"
              letterSpacing="0.15rem"
              pos="relative"
            >
              <span className="btn-border-top-left" />
              <span className="btn-border-bottom-right" />

              <Text className="btn-text" color={color.light}>
                {text}
              </Text>
            </Box>
          </Flex>
        </MotionY>
      </a>
    </NextLink>
  );
};

export default LearnMoreButton;

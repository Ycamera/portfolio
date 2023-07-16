import { Box, Heading } from "@chakra-ui/react";
import LayoutTop from "./LayoutTop";
import Motion, { MotionY } from "/components/Motion";
import ScrollComponent from "../scroll/ScrollComponent";
import { memo } from "react";

const notSelectable = {
  pointerEvents: "none",
  userSelect: "none",
};

const Top = memo(({ touchDevice }) => {
  return (
    <LayoutTop>
      <MotionY y={100} disappearDelay={0.1}>
        <Heading as="h1" fontWeight="bold" fontSize={{ base: "2.5rem", sm: "4rem" }} letterSpacing="0.5rem" {...notSelectable}>
          RYOSUKE
        </Heading>
      </MotionY>

      <MotionY y={100} appearDelay={0.1}>
        <Box pos="absolute" zIndex="-1" fontSize={{ base: "10rem", sm: "16rem" }} color="rgba(255,255,255,0.2)" {...notSelectable}>
          K
        </Box>
      </MotionY>
      <Motion initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <Box pos="absolute" bottom="10%" left="50%" transform="translateX(-50%)">
          <ScrollComponent touchDevice={touchDevice} />
        </Box>
      </Motion>
    </LayoutTop>
  );
});

export default Top;

import { Box, Flex, Heading, Text, Circle } from "@chakra-ui/react";

import { color } from "/styles/variable";
import LayoutTop from "./LayoutTop";
import BottomSmoke from "./BottomSmoke";
import Motion, { MotionY } from "/components/Motion";
import { AnimatePresence } from "framer-motion";

const notSelectable = {
  pointerEvents: "none",
  userSelect: "none",
};

const Top = ({ touchDevice }) => {
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
      <ScrollComponent touchDevice={touchDevice} />
    </LayoutTop>
  );
};

const ScrollComponent = ({ touchDevice }) => {
  return (
    <AnimatePresence exitBeforeEnter>
      {!touchDevice && (
        <Motion initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <Box pos="absolute" bottom="10%">
            <Text as="span" color={color.light} fontSize="0.8rem" zIndex={"1"}>
              SCROLL
            </Text>
            <Box inset="0" margin="auto" bottom="0" bg={color.light} w="0.06rem" height="1.875rem" className="menu-line" my="0.625rem" />
          </Box>
        </Motion>
      )}
    </AnimatePresence>
  );
};

export default Top;

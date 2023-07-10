import React, { useState, useEffect } from "react";
import Motion from "../Motion";
import { AnimatePresence } from "framer-motion";
import { Box, Text } from "@chakra-ui/react";
import { color } from "/styles/variable";

const ScrollComponent = ({ touchDevice = false, delay = 0 }) => {
  const [show, setShow] = useState(true);

  function getScrollYAndSetShow() {
    return setShow(window.scrollY === 0);
  }
  useEffect(() => {
    window.addEventListener("scroll", getScrollYAndSetShow);
    return () => {
      window.addEventListener("scroll", getScrollYAndSetShow);
    };
  }, []);
  return (
    !touchDevice && (
      <Motion initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: delay }}>
        <Box pos="absolute" bottom="10%">
          <AnimatePresence>
            {show && (
              <Motion initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: "-1rem" }} transition={{ duration: 1 }}>
                <Box>
                  <Text as="span" color={color.light} fontSize="0.8rem" zIndex={"1"}>
                    SCROLL
                  </Text>
                  <Box inset="0" margin="auto" bottom="0" bg={color.light} w="0.06rem" height="1.875rem" className="menu-line" my="0.625rem" />
                </Box>
              </Motion>
            )}
          </AnimatePresence>
        </Box>
      </Motion>
    )
  );
};

export default ScrollComponent;

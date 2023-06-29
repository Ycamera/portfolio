import React from "react";
import { Box } from "@chakra-ui/react";
import Motion from "../Motion";

const ScrollAnimateElement = ({ children, customVariants = { offScreen: {}, onScreen: {} } }) => {
  const defaultVariants = {
    offScreen: { opacity: 0 },
    onScreen: { opacity: 1 },

    transition: {},
  };

  const variants = {};
  for (const key in defaultVariants) {
    variants[key] = { ...defaultVariants[key], ...customVariants[key] };
  }

  return (
    <Motion
      variants={variants}
      initial="offScreen"
      whileInView="onScreen"
      transition={{ ...variants?.transition }}
      viewport={{ once: true, amount: 0 }}
    >
      {children}
    </Motion>
  );
};

export default ScrollAnimateElement;

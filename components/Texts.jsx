import React from "react";
import { Box } from "@chakra-ui/react";
import { color, letterSpacing } from "../styles/variable.mjs";

export const TextSM = ({ children, style }) => {
  return (
    <Box
      as="span"
      display="block"
      fontSize="0.8rem"
      fontWeight="normal"
      fontFamily="Klee One"
      color={color.light}
      mt="0.5rem"
      letterSpacing={letterSpacing.sm}
      {...style}
    >
      {children}
    </Box>
  );
};

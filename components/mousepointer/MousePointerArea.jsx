import React, { useContext, memo } from "react";
import { Box } from "@chakra-ui/react";
import { PointerContext } from "../../pages/_app";

const MousePointerArea = memo(({ onEnterKey = "default", style, children }) => {
  const { pointer, setPointer } = useContext(PointerContext);
  return (
    <Box {...(style && { ...style })} onPointerEnter={() => setPointer(onEnterKey)} onPointerLeave={() => setPointer("default")} pointerEvents="auto">
      {children}
    </Box>
  );
});

export default MousePointerArea;

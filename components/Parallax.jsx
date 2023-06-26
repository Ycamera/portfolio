import React, { useRef, useState, useEffect, useContext } from "react";
import { Box, Flex } from "@chakra-ui/react";
import Motion from "./Motion";

export const ParallaxContext = React.createContext();

const ParallaxContainer = ({ children }) => {
  const containerRef = useRef(null);

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [parallax, setParallax] = useState({ y: 0, x: 0 });

  function setMousePos(e) {
    e.preventDefault();
    setMouse({ x: e.pageX, y: e.pageY });
  }
  useEffect(() => {
    if (mouse.x === 0 || mouse.y === 0) return;

    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;

    const x = containerRect.x;
    const y = containerRect.y;
    const w = containerRect.width;
    const h = containerRect.height;

    const centerX = x + w / 2;
    const centerY = y + h / 2;

    const scrollTop = window.pageYOffset;

    const percentX = (mouse.x - centerX) / (w / 2);
    const percentY = (mouse.y - scrollTop - centerY) / (h / 2);

    setParallax({ y: percentY, x: percentX });
  }, [mouse]);

  return (
    <ParallaxContext.Provider value={parallax}>
      <Box
        pos="fixed"
        top="0"
        left="0"
        w="100%"
        h="100vh"
        zIndex="199"
        onPointerMove={setMousePos}
        onPointerLeave={() => {
          setMouse({ x: 0, y: 0 });
          setParallax({ y: 0, x: 0 });
        }}
        ref={containerRef}
        // pointerEvents="none"
        userSelect="none"
      />
      {children}
    </ParallaxContext.Provider>
  );
};
export default ParallaxContainer;

export const ParallaxElement = ({ children, xy = 15 }) => {
  const parallax = useContext(ParallaxContext);

  const x = parallax?.x * xy * -1;
  const y = parallax?.y * xy * -1;

  return (
    <Motion animate={{ x, y }}>
      <Box>{children}</Box>
    </Motion>
  );
};

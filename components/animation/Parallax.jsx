import React, { useRef, useState, useEffect, useContext, memo } from "react";
import { Box } from "@chakra-ui/react";
import Motion from "../Motion";
import { RootFontSizeContext } from "../../pages/_app";

const Parallax = memo(({ children, rotateDegree = 5, translate = 0.5 }) => {
  const rootFontSize = useContext(RootFontSizeContext) / 2;

  const containerRef = useRef(null);

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [rotate, setRotate] = useState({ y: 0, x: 0, rotateX: 0, rotateY: 0 });

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

    // const rotateX = percentY * rotateDegree * -1;
    // const rotateY = percentX * rotateDegree;

    const translateX = percentX * rootFontSize * translate;
    const translateY = percentY * rootFontSize * translate;

    // setRotate({ y: translateY, x: translateX, rotateX, rotateY });
    setRotate({ y: translateY, x: translateX, rotateX: 0, rotateY: 0 });
  }, [mouse]);

  return (
    <Box
      onPointerMove={setMousePos}
      onPointerLeave={() => {
        setMouse({ x: 0, y: 0 });
        setRotate({ y: 0, x: 0, rotateX: 0, rotateY: 0 });
      }}
      ref={containerRef}
      userSelect="none"
    >
      <Motion animate={{ ...rotate }}>
        <Box>{children}</Box>
      </Motion>
    </Box>
  );
});

export default Parallax;

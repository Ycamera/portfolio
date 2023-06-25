import React, { useEffect, useState, useContext, useRef } from "react";
import { Box, Flex, Grid, Image } from "@chakra-ui/react";
import Motion from "./Motion";
import { PointerContext, RootFontSizeContext } from "../pages/_app";
import { color } from "../styles/variable.mjs";
import neocosmoImg from "../public/images/neocosmo.png";
import MousePointerArea from "./MousePointerArea";

const Aspect = { w: 5, h: 3 };
const AspectSize = 7;

// w="min(100%,70rem)"
const SiteCards = () => {
  return (
    <Grid justifyContent="center" templateColumns={"repeat(auto-fit,minmax(15rem,20rem))"} marginInline="auto" marginBlock="5rem" gap="3rem">
      <SiteCard img={neocosmoImg} />
      <SiteCard img={neocosmoImg} />
      <SiteCard img={neocosmoImg} />
    </Grid>
  );
};
const SiteCard = ({ img }) => {
  return (
    <Flex p="0rem" bg="#141414" borderRadius="0.5rem" w="min(100%,20rem)" marginInline="auto">
      <MousePointerArea onEnterKey="view">
        <Parallax>
          <Image src={img.src} pointerEvents="none" w="min(100%,20rem)" h="min(100%,12rem)" objectFit="contain" objectPosition="center center" />
        </Parallax>
      </MousePointerArea>
    </Flex>
  );
};

const Parallax = ({ children, rotateDegree = 10, translate = 1 }) => {
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

    const rotateX = percentY * rotateDegree * -1;
    const rotateY = percentX * rotateDegree;

    const translateX = percentX * rootFontSize * translate;
    const translateY = percentY * rootFontSize * translate;

    setRotate({ y: translateY, x: translateX, rotateX, rotateY });
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
};
export default SiteCards;

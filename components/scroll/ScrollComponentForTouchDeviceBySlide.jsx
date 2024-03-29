import Motion from "../Motion";
import { color } from "/styles/variable";
import { Box, Flex } from "@chakra-ui/react";
import React, { useState, useContext, memo } from "react";
import { RootFontSizeContext } from "../../pages/_app";

const ScrollComponentForTouchDeviceBySlide = memo(({ setIndex, index, indexLength }) => {
  const rootFontSize = useContext(RootFontSizeContext);
  const [startMousePosition, setStartMousePosition] = useState({ x: null, y: null });

  function onDragStartMousePosition(e) {
    setStartMousePosition({ x: e.x, y: e.y });
  }
  function onDragMoveMousePosition(e) {
    const y = e.y;

    const slideButtonUpDetectPosition = rootFontSize * -2 + startMousePosition.y;
    const slideButtonDownDetectPosition = rootFontSize * 2 + startMousePosition.y;

    if (y < slideButtonUpDetectPosition) {
      setIndex(-1);
    } else if (y > slideButtonDownDetectPosition) {
      setIndex(1);
    }
  }

  return (
    <Motion initial={{ opacity: 0, y: "3rem" }} animate={{ opacity: 1, y: "0rem" }} transition={{ duration: 0.5 }}>
      <Flex w="2rem" h="5rem" pos={"absolute"} bottom="10%" right="4rem" borderRadius="5rem" alignItems="center" justifyContent={"center"}>
        <ArrowComponentForScroll direction="up" index={index} indexLength={indexLength} onClick={() => setIndex(-1)} />
        <ArrowComponentForScroll index={index} indexLength={indexLength} onClick={() => setIndex(1)} />
        <Motion
          style={{
            width: "7rem",
            height: "3rem",
            cursor: "grab",
          }}
          drag="y"
          dragDirectionLock
          dragConstraints={{ top: rootFontSize * -1.6, bottom: rootFontSize * 1.6 }}
          dragTransition={{ bounceStiffness: 500, bounceDamping: 30 }}
          dragElastic={0}
          dragSnapToOrigin
          whileTap={{ cursor: "grabbing" }}
          onDragStart={onDragStartMousePosition}
          onDrag={onDragMoveMousePosition}
        >
          <Flex justifyContent="center" alignItems="center">
            <Flex
              borderRadius="50%"
              w="1.3rem"
              h="1.3rem"
              boxShadow={`inset 0 0 0.5rem ${color.light}`}
              justifyContent="center"
              alignItems="center"
            ></Flex>
          </Flex>
        </Motion>
      </Flex>
    </Motion>
  );
});

const ArrowComponentForScroll = memo(({ direction, index, indexLength, onClick }) => {
  const isUp = direction === "up";

  const styleProps = {
    pointerEvents: "none",
    content: "''",
    pos: "absolute",
    top: "50%",
    w: "56%",
    h: "0.1rem",
    bg: color.light300,
  };

  const rotateDegree = 35;

  return (
    <Box
      w="2rem"
      pos="absolute"
      transition="opacity 0.5s , transform 0.5s"
      onClick={onClick}
      h="2rem"
      {...(isUp
        ? { top: "-1rem", ...(index === 0 ? { opacity: 0, transform: "translateY(-1rem)" } : { opacity: 1, transform: "translateY(0)" }) }
        : {
            bottom: "-1rem",
            ...(index === indexLength - 1 ? { opacity: 0, transform: "translateY(1rem)" } : { opacity: 1, transform: "translateY(0)" }),
          })}
      _before={{
        ...styleProps,
        right: 0,
        transform: isUp ? `translateY(-50%) rotate(${rotateDegree}deg)` : `translateY(-50%) rotate(-${rotateDegree}deg)`,
      }}
      _after={{
        ...styleProps,
        left: 0,
        transform: isUp ? `translateY(-50%) rotate(-${rotateDegree}deg)` : `translateY(-50%) rotate(${rotateDegree}deg)`,
      }}
    />
  );
});

export default ScrollComponentForTouchDeviceBySlide;
